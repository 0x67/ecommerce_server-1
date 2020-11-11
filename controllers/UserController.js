const {User} = require('../database/models')
const {compareHash} = require('../helpers/password')
const {signToken} = require('../helpers/access_token')

class UserController {
    static async login(req, res, next) {
        try {
            const userInfo = {
               email: req.body.email,
               password: req.body.password
            }
   
            const user = await User.findOne({
               where: {
                  email: userInfo.email
               }
            })
   
            if (!user) {
               throw {
                  status: 400,
                  message: `Account not found`
               }
            } else if (!compareHash(userInfo.password, user.password)) {
               throw {
                  status: 400,
                  message: `Email/password didn't match`
               }
            } else {
               const access_token = signToken({
                  id: user.id,
                  email: user.email,
                  role: user.role
               })
   
               res.status(200).json({access_token})
            }
         } catch (err) {
            next(err)
         }
    }
}

module.exports = UserController