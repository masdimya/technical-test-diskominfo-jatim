const productValidation = require('../validations/product.validation')
const { Op } = require('sequelize')


module.exports = {
  async list(){

    const get = await db.product.findAll({
      attributes:[
        'id', 'name', 'price', 'stock', 'sold', 'created_at', 'updated_at'
      ],
      where : {
        deleted_at: {
          [Op.is]: null
        }
      }
    })
   
    return get
  },

  async create(productData){
    productValidation.createProduct(productData)

    const create = await db.product.create({
      name: productData.name,
      price: productData.price,
      stock: productData.stock
    })

    return create
  },

  async detail(productData){

    if(!productData.id){
      throw 'params id not found'
    }

    const get = await db.product.findOne({
      attributes:[
        'id', 'name', 'price', 'stock', 'sold', 'created_at', 'updated_at'
      ],
      where : {
        id: productData.id,
        deleted_at: {
          [Op.is]: null
        }
      }
    })
   
    return get
  },

  async update(productData){
    productValidation.updateProduct(productData)

    const update = await db.product.update({
      name: productData.name,
      price: productData.price,
      stock: productData.stock,
      updated_at: new Date()
    },{
      where : {
        id: productData.id,
        deleted_at: {
          [Op.is]: null
        }
      }
    })

    


    const get = await module.exports.detail(productData)
   
    return get
  },

  async delete(productData){
    if(!productData.id){
      throw 'params id not found'
    }

    const get = await module.exports.detail(productData)

    const del = await db.product.update({
      deleted_at: new Date(),
    },{
      where : {
        id: productData.id,
        deleted_at: {
          [Op.is]: null
        }
      }
    })

   

    
   
    return get
  },
}