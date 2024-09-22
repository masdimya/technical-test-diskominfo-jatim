`use strict`

const productService = require('../services/product.service');
const orderService = require('../services/order.service');
const orderValidation = require('../validations/order.validation');


module.exports = {
  async listOrder(req,res){
    try {
      const get = await orderService.list()

      const payload  = {
        message: "Order List",
        data: get
      }


      res.status(200).send(payload)
    } catch (error) {
      console.error('get list order',error)
      res.status(500).send({
        message: 'internal server error'
      })
    }
  },

  async createOrder(req,res){
    const t = await db.sequelize.transaction();
    try {
      const orderData = req.body
      orderValidation.createOrder(orderData)

      const getProduct = await productService.list([
        'id','name', 'stock', 'sold', 'price', 'created_at', 'updated_at'
      ],{
        id: orderData.products.map(item => item.id)
      })

      const inStock = orderService.checkStock(orderData, getProduct)
      const createOrder = await orderService.create(inStock, t)
      const updateStock = await productService.order(inStock, t)
      

      const payload = {
        message: "Order created",
        data: {
          id: createOrder.id,
          products: updateStock,
          created_at: createOrder.created_at,
          updated_at: createOrder.updated_at
        }
      }


      await t.commit()
      res.status(200).send(payload)

    } catch (error) {
      await t.rollback();
      console.error('create order',error)
      res.status(500).send({
        message: 'internal server error'
      })
    }
  },

  async getDetailOrder(req,res){
    try {
      const get = await orderService.detail({
        id: req.params.id
      })

      const payload  = {
        message: "Product Detail",
        data: get
      }


      res.status(200).send(payload)
    } catch (error) {
      console.error('get detail order',error)
      res.status(500).send({
        message: 'internal server error'
      })
    }
  },

  async deleteOrder(req,res){
    const t = await db.sequelize.transaction();
    try {
      const orderId = req.params.id
      const orderData = await orderService.detail({
        id: orderId
      })

      const cancelOrder = await productService.cancelOrder({
        id: orderData.products.map(item => item.id),
        products: orderData.products
      }, t)

      const deleteOrder = await orderService.delete({
        id: orderId
      }, t)



      const payload = {
        message: "Order deleted successfully",
        data:{
          id: orderData.id,
          created_at: orderData.created_at,
          updated_at: orderData.updated_at,
          products: cancelOrder.products
        }
      }

      await t.commit()
      res.status(200).send(payload)

    } catch (error) {
      await t.rollback();
      console.error('delete order',error)
      res.status(500).send({
        message: 'internal server error'
      })
    }
  },
}