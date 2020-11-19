const router = require('express').Router()
const CustomerController = require('../controllers/CustomerController')
const CartController = require('../controllers/CartController')

router.get('/', CartController.getAllProducts)
router.post('/register', CustomerController.register)
router.post('/login', CustomerController.login)

module.exports = router