const {User, ShoppingCart} = require('../database/models')
const {verifyToken} = require('../helpers/access_token')

const cartAuthentication = async (req, res, next) => {
  const {access_token} = req.headers

  try {
    if(!access_token) {
      throw {
        status: 401,
        message: 'Authentication Failed'
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
          status: 401,
          message: 'Authentication Failed'
        }
      } else {
        req.customerLogin = decoded
        next()
      }
   }
  } catch (err) {
    const status = err.status || 500
    const message = err.message || 'Internal Server Error'

    res.status(status).json({error: message})
  }
}


const cartAuthorization = async (req, res, next) => {
  const {id} = req.params

  try {
    const cart = await ShoppingCart.findByPk(id)

    if(!cart) {
      throw {
        status: 400,
        message: 'Cart not found'
      }
    } else if(cart.UserId !== req.customerLogin.id) {
      throw {
        status: 401,
        message: 'Not Authorized'
      }
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}
module.exports = {cartAuthentication, cartAuthorization}