const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const {authentication, authorization} = require('../middlewares/user_auth')

router.use(authentication)
router.get('/', ProductController.getAllProducts)

router.post('/', ProductController.addProduct)

router.get('/:id', authorization, ProductController.getProductById)
router.put('/:id', authorization, ProductController.editProductById)
router.delete('/:id', authorization, ProductController.deleteProductById)

module.exports = router