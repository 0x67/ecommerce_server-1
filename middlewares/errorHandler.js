module.exports = (err, req, res, next) => {
   let status = 500
   let message = err.message || 'Internal Server Error'
   if (err.name === 'SequelizeValidationError' || err.name === 'UniqueConstraintError') {
      status = 400
      message = err.errors[0].message
      res.status(status).json({error: message})

   } else if (err.message == "Account not found" || err.message == "Email/password didn't match") {
      status = err.status
      message = err.message
      res.status(status).json({error: message})
   } else {
      res.status(status).json({error: message})
   }
}