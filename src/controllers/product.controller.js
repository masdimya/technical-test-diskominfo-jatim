`use strict`

const productService = require('../services/product.service');

module.exports = {
  async listProduct(req,res){
    try {
      const get = await productService.list()

      const payload  = {
        message: "Product List",
        data: get
      }


      res.status(200).send(payload)
    } catch (error) {
      console.error('create product',error)
      res.status(500).send({
        message: 'internal server error'
      })
    }
  },

  async createProduct(req,res){
    try {
      const create = await productService.create(req.body)

      const payload  = {
        message: "Product created successfully",
        data: create
      }


      res.status(201).send(payload)
    } catch (error) {
      console.error('create product',error)
      res.status(500).send({
        message: 'internal server error'
      })
    }
  },

  async getProduct(req,res){
    try {
      const get = await productService.detail({
        id: req.params.id
      })

      const payload  = {
        message: "Product Detail",
        data: get
      }


      res.status(200).send(payload)
    } catch (error) {
      console.error('create product',error)
      res.status(500).send({
        message: 'internal server error'
      })
    }
  },

  async updateProduct(req,res){
    try {
      const get = await productService.update({
        id: req.params.id,
        ...req.body
      })

      const payload  = {
        message: "Product updated successfully",
        data: get
      }


      res.status(200).send(payload)
    } catch (error) {
      console.error('create product',error)
      res.status(500).send({
        message: 'internal server error'
      })
    }
  },

  async deleteProduct(req,res){
    try {
      const get = await productService.delete({
        id: req.params.id,
        ...req.body
      })

      const payload  = {
        message: "Product deleted successfully",
        data: get
      }


      res.status(200).send(payload)
    } catch (error) {
      console.error('create product',error)
      res.status(500).send({
        message: 'internal server error'
      })
    }
  },
}