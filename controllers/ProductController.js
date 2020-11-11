const {
   Product
} = require('../database/models')

class ProductController {
   static async getAllProducts(req, res, next) {
      const UserId = req.userLogin.id

      try {
         const products = await Product.findAll({
           where: {
             UserId
           }
         })
         res.status(200).json(products)
      } catch (err) {
         next(err)
      }
   }

   static async addProduct(req, res, next) {
      try {
         const newProduct = {
            name: req.body.name,
            stock: +req.body.stock,
            price: +req.body.price,
            image_url: req.body.image_url,
            category: req.body.category,
            UserId: req.userLogin.id
         }

         const product = await Product.create(newProduct)

         res.status(201).json(product)
      } catch (err) {
         next(err)
      }
   }

   static async getProductById(req, res, next) {
      try {
         const id = +req.params.id

         const product = await Product.findByPk(id)

         if (!product) {
            throw {
               status: 400,
               message: 'Product not found'
            }
         } else {
            res.status(200).json(product)
         }
      } catch (err) {
         next(err)
      }
   }

   static async editProductById(req, res, next) {
      try {
         const id = +req.params.id

         const editedProduct = {
            name: req.body.name,
            stock: +req.body.stock,
            price: +req.body.price,
            image_url: req.body.image_url,
            category: req.body.category
         }
         const product = await Product.update(editedProduct, {
            where: {
               id
            },
            returning: true
         })

         res.status(201).json(product[1][0])
      } catch (err) {
         next(err)
      }
   }

   static async deleteProductById(req, res, next) {
      try {
         const id = +req.params.id

         const product = await Product.destroy({
            where: {
               id
            }
         })

         res.status(201).json({
            message: 'Product successfully deleted'
         })
      } catch (err) {
         next(err)
      }
   }
}

module.exports = ProductController