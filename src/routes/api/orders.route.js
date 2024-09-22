const orderController = require('../../controllers/order.controller')

module.exports = (router) => {
  
  router.get('/',(req,res)=> {
    orderController.listOrder(req,res)
  })

  router.post('/',(req,res)=> {
    orderController.createOrder(req,res)
  })

  router.get('/:id',(req,res)=> {
    orderController.getDetailOrder(req,res)
  })

  router.delete('/:id',(req,res)=> {
    orderController.deleteOrder(req,res)
  })

  
  return router


}