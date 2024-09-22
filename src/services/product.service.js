const productValidation = require('../validations/product.validation')
const { Op } = require('sequelize')


module.exports = {
  async list(attributes=[
    'id', 'name', 'price', 'stock', 'sold', 'created_at', 'updated_at'
  ], filter = {}){
    productValidation.filterProduct(filter)

    const get = await db.product.findAll({
      attributes,
      where : {
        ...filter,
        deleted_at: {
          [Op.is]: null
        }
      }
    })

    const stringify = JSON.stringify(get, null, 2);
    const products = JSON.parse(stringify);
   
    return products
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

  async order(productData, transaction = null){

    const orderProduct = productData.products.map(item => {
      return {
        id: item.product_id,
        name: item.name,
        price: item.price,
        stock: item.stock - item.quantity,
        sold: item.sold + item.quantity,
        quantity: item.quantity,
        created_at: item.created_at,
        updated_at: new Date()
      }
    })

    const update = await db.product.bulkCreate(orderProduct,{
      fields: [ "id", "name", "price", "stock", "sold", "updated_at"],
      updateOnDuplicate: [
        "stock", "sold", "updated_at"
      ],
      ...(transaction ? {transaction} : {})
    })
   
    return orderProduct
  },

  async cancelOrder(productData, transaction = null){

    const products = await module.exports.list([
      'id','name', 'stock', 'sold', 'price', 'created_at', 'updated_at'
    ],{
      id: productData.id
    })

    products.forEach(product => {
      const productOrder = productData.products.find(item => item.id == product.id)

      product.stock = product.stock + productOrder.quantity
      product.sold  = product.sold - productOrder.quantity 
      product.quantity  = productOrder.quantity 
      
    });

    const update = await db.product.bulkCreate(products,{
      fields: [ "id", "name", "price", "stock", "sold", "updated_at"],
      updateOnDuplicate: [
        "stock", "sold", "updated_at"
      ],
      ...(transaction ? {transaction} : {})
    })
   
    return { products }
  },


}