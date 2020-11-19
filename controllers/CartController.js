const e = require('express')
const {ShoppingCart, CartDetail, Product} = require('../database/models')

/* Shopping Cart Status Code
0: Pending,
1: Cancelled/Removed,
2: Transaction Finished
*/
class CartController {
  static async getAllProducts(req, res, next) {
    try {
      const product = await Product.findAll()

      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  }

  static async addToCart(req, res, next) {
    try {
      const UserId = req.customerLogin.id
      let cartId = 0

      let shoppingCart = await ShoppingCart.findOne({
        where: {
          UserId: UserId,
          status: 0
        }
      })

      if(!shoppingCart) {
        const newCart = {
          totalPrice: 0,
          status: 0,
          UserId: UserId
        }
        shoppingCart = await ShoppingCart.create(newCart)
        cartId = shoppingCart.id
      }

      const checkStock = await Product.findOne({
        where: {
          id: req.body.ProductId
        }
      })
      
      const productPrice = req.body.quantity * checkStock.price

      const newCart = {
        ProductId: req.body.ProductId,
        CartId: shoppingCart.id,
        quantity: req.body.quantity,
        price: productPrice
      }
      // Check if newCart stock is more than Product stock

      if (newCart.quantity > checkStock.stock) {
        throw {
          status: 400,
          message: `Cart quantity can't be more than product stock`
        }
      } else {
        const checkCart = await CartDetail.findOne({
          where: {
            ProductId: newCart.ProductId,
            CartId: newCart.CartId
          }
        })
        
        if (!checkCart) {
          const cart = await CartDetail.create(newCart)

          const getCart = await ShoppingCart.findOne({
            where: {
              UserId: req.customerLogin.id,
              status: 0
            }
          })
          
          const getPrice = await CartDetail.findAll({
            where: {
              CartId: getCart.id
            }
          })
  
          let price = 0
  
          getPrice.forEach(el => {
            price += el.price
          });
  
          const totalPrice = {
            totalPrice: price
          }
          const updateTotalPrice = await ShoppingCart.update(totalPrice, {
            where: {
              UserId: req.customerLogin.id,
              status: 0
            }
          })
          const userResponse = await ShoppingCart.findOne({
            where: {
              UserId,
              status: 0
            },
            include: [{
              model: CartDetail,
              include: {
                model: Product
              }
            }]
          })

          res.status(201).json(userResponse)
        } else {
          const updateQty = await CartDetail.update(newCart, {
            where: {
              CartId: newCart.CartId,
              ProductId: newCart.ProductId
            }
          })

          const getCart = await ShoppingCart.findOne({
            where: {
              UserId: req.customerLogin.id,
              status: 0
            }
          })
          
          const getPrice = await CartDetail.findAll({
            where: {
              CartId: getCart.id
            }
          })
  
          let price = 0
  
          getPrice.forEach(el => {
            price += el.price
          });
  
          const totalPrice = {
            totalPrice: price
          }

          const updateTotalPrice = await ShoppingCart.update(totalPrice, {
            where: {
              UserId: req.customerLogin.id,
              status: 0
            }
          })

          const userResponse = await ShoppingCart.findOne({
            where: {
              UserId,
              status: 0
            },
            include: [{
              model: CartDetail,
              include: {
                model: Product
              }
            }]
          })
          res.status(201).json(userResponse)
        }

        
      }
    } catch (err) {
      console.log(err, 'di cont');
      next(err)
    } 
  }

  static async getCart(req, res, next) {
    
    try {
      const UserId = req.customerLogin.id

      const cart = await ShoppingCart.findOne({
        where: {
          UserId: UserId,
          status: 0,
        }, 
        include: {
          model: CartDetail,
          include: {
            model: Product,
          }
        }
      })

      res.status(200).json(cart)
    } catch (err) {
      next(err)
    }
  }

  static async editCartQuantity(req, res, next) {
    /* EditCart qty status code
    0: +Quantity
    1: -Quantity
    */
    const status = req.body.status
    const ProductId = +req.body.ProductId
    const UserId = req.customerLogin.id

    try {
      if (status == 1) {
        const cart = await ShoppingCart.findOne({
          where: {
            UserId,
            status: 0
          },
          include: {
            model: CartDetail,
            where: {
              ProductId: ProductId
            }
          }
        })

        const checkStock = await Product.findOne({
          where: {
            id: ProductId
          }
        })

        const qty = {
          quantity: cart.CartDetails[0].quantity + 1
        }
        
        if (qty.quantity > checkStock.stock) {
          throw {
            status: 400,
            message: `Can't add more product to cart`
          }
        } else {
          const updateQuantity = await CartDetail.update(qty, {
            where: {
              CartId: cart.id,
              ProductId
            },
            returning: true
          })
          
          res.status(201).json(updateQuantity[1][0])
        }
      } else {
        const cart = await ShoppingCart.findOne({
          where: {
            UserId,
            status: 0
          },
          include: {
            model: CartDetail,
            where: {
              ProductId: ProductId
            }
          }
        })

        const checkStock = await Product.findOne({
          where: {
            id: ProductId
          }
        })

        const qty = {
          quantity: cart.CartDetails[0].quantity - 1
        }
        
        const updateQuantity = await CartDetail.update(qty, {
          where: {
            CartId: cart.id,
            ProductId
          },
          returning: true
        })
        
        if (updateQuantity[1][0].quantity <= 0) {
          const deleteCart = await CartDetail.destroy({
            where: {
              quantity: 0
            }
          })

          res.status(201).json('Cart successfully Deleted')
        } else {
          res.status(201).json(updateQuantity[1][0])
        }        
      }
    } catch (err) {
      next(err)
    }
  }

  static async checkout(req, res, next) {
    try {
      const {id} = req.params

      const userCart = await CartDetail.findAll({
        where: {
          CartId: id,
        }
      })
      
      const promise = await Promise.all(
        await userCart.map(async el => {
          const product = await Product.findByPk(el.ProductId)
          const newQuantity = {
            stock: product.stock - el.quantity
          }
          
          if(newQuantity.stock <= 0) {
            throw {
              status: 400,
              message: 'Sorry, but currently this product is out of stock'
            }
          } else {
            return await Product.update(newQuantity, {
              where: {
                id: el.ProductId
              },
              returning: true
            })
          }
        })
      )
      
      const updated = promise.map(el => {
        return el[1][0]
      })

      const status =  {
        status: 2
      }

      const UserId = req.customerLogin.id

      const finishedTransaction = await ShoppingCart.update(status, {
        where: {
          status: 0,
          UserId
        }
      })
      res.status(201).json(updated)
    } catch (err) {
      next(err)
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const {id} = req.params

      const deleteCart = await CartDetail.destroy({
        where: {
          CartId: id,
          ProductId: req.body.ProductId
        }
      })

      res.status(200).json('Cart Successfully Deleted')
    } catch (err) {
      next(err)
    }
  }

  static async deleteItem(req, res, next) {
    try {
      const {id} = req.params

      const deleteCart = await CartDetail.destroy({
        where: {
          CartId: id,
          ProductId: req.body.ProductId
        }
      })

      res.status(200).json('Cart Successfully Deleted')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartController