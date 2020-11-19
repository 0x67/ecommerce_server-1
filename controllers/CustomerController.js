const {User} = require('../database/models')
const {compareHash} = require('../helpers/password')
const {signToken} = require('../helpers/access_token')

class CustomerController {
  static async register(req, res, next) {
    try {
      const newCustomer = {
        email: req.body.email,
        password: req.body.password,
        role: 'Customer'
      }

      const user = await User.create(newCustomer)
      
      res.status(201).json({
        id: user.id,
        email: user.email
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const userInfo = {
        email: req.body.email,
        password: req.body.password,
      }

      const user = await User.findOne({
        where: {
          email: userInfo.email
        }
      })

      if(!user) {
        throw {
          status: 400,
          message: 'Wrong email/password'
        }
      } else if (user.role === 'Admin') {
        throw {
          status: 401,
          message: 'Not Authorized'
        }
      } else if (!compareHash(userInfo.password, user.password)) {
        throw {
          status: 400,
          message: 'Wrong email/password'
        }
      } else {
        const access_token = signToken({
          id: user.id,
          email: user.email
        })

        res.status(200).json({access_token})
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CustomerController