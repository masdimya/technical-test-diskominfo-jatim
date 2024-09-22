const productController = require('../../controllers/product.controller')

module.exports = (router) => {
  router.get('/',(req,res)=> {
    productController.listProduct(req,res)
  })

  router.post('/',(req,res)=> {
    productController.createProduct(req,res)
  })

  router.get('/:id',(req,res)=> {
    productController.getProduct(req,res)
  })

  router.put('/:id',(req,res)=> {
    productController.updateProduct(req,res)
  })

  router.delete('/:id',(req,res)=> {
    productController.deleteProduct(req,res)
  })

  return router


}