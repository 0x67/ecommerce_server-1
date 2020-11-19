const router = require('express').Router()
const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const CartRouter = require('./CartRouter')
const CustomerRouter = require('./CustomerRouter')

router.use('/users', UserRouter)
router.use('/products', ProductRouter)

router.use('/customers', CustomerRouter)
router.use('/carts', CartRouter)

module.exports = router