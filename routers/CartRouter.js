const router = require('express').Router()
const CartController = require('../controllers/CartController')
const {cartAuthentication, cartAuthorization} = require('../middlewares/cart_auth')

router.use(cartAuthentication)
router.get('/', CartController.getCart)
router.post('/add-cart', CartController.addToCart)
router.delete('/:id', cartAuthorization, CartController.deleteCart)
router.delete('/items/:id', cartAuthorization, CartController.deleteItem)

router.post('/checkout/:id', cartAuthorization, CartController.checkout)
router.put('/edit-cart/:id', cartAuthorization, CartController.editCartQuantity)
module.exports = router