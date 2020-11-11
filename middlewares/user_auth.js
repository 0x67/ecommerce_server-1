const {User, Product} = require('../database/models')
const {verifyToken} = require('../helpers/access_token')

const authentication = async (req, res, next) => {
   const {access_token} = req.headers

   try {
      if(!access_token) {
         throw {
            message: "Authentication Failed",
            status: 401
         }
      } else {
         const decoded = verifyToken(access_token)

         const user = User.findOne({
            where: {
               email: decoded.email
            }
         })

         if(!user) {
            throw {
               message: "Authentication Failed",
               status: 401
            }
         } else {
            req.userLogin = decoded
            next()
         }
      }
   } catch (err) {
      const status = err.status || 500
      const message = err.message || 'Internal Server Error'

      res.status(status).json({error: message})
   }
}

const authorization = async (req, res, next) => {
    const {id} = req.params
    try {
       const product = await Product.findByPk(id)
 
       if(!product) {
          throw {
             status: 400,
             message: 'product Not Found'
          }
       } else if(product.UserId !== req.userLogin.id) {
          throw {
             status: 401,
             message: 'Not Authorized'
          }
       } else {
          next()
       }
    } catch (err) {
       const status = err.status || 500
       const message = err.message || 'Internal Server Error'
 
       res.status(status).json({error: message})
    }
}

module.exports = {authentication, authorization}