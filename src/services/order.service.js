const orderValidation = require('../validations/order.validation')
const { Op, col,literal } = require('sequelize')


module.exports = {
  async list(){
    const get = await db.order.findAll({
      attributes:[
        "id",
        "created_at",
        "updated_at",
      ],
      include: [
        {
          attributes:[
            [literal("`products->product`.`id`"), 'id'],
            [literal("`products->product`.`price`"), 'price'],
            [literal("`products->product`.`name`"), 'name'],
            [literal("`products->product`.`stock`"), 'stock'],
            [literal("`products->product`.`sold`"), 'sold'],
            [literal("`products->product`.`created_at`"), 'created_at'],
            [literal("`products->product`.`updated_at`"), 'updated_at'],
            'quantity'
          ],
          model: db.order_item,
          as: 'products',
          required:true,
          include: [
            {
              attributes:[],
              model: db.product,
              as: 'product',
              required:true,
              where:{
                deleted_at: {
                  [Op.is]: null
                }
              },
              raw:true

            }
          ],
          where:{
            deleted_at: {
              [Op.is]: null
            }
          },

          
        }
      ],
      where : {
        deleted_at: {
          [Op.is]: null
        }
      },
    })
   
    return get
  },

  async create(orderData, transaction = null){
    orderValidation.createOrderItem(orderData)
    
    const createOrder = await db.order.create({},{
      ...(transaction ? {transaction} : {})
    })

    const orderItem = orderData.products.map(item => {
      return {
        product_id: item.product_id,
        quantity: item.quantity,
        order_id: createOrder.dataValues.id
      }
    })

    const createOrderItem = await db.order_item.bulkCreate(orderItem, {
      ...(transaction ? {transaction} : {})
    }) 

    return {
      id: createOrder.dataValues.id,
      products: orderItem,
      created_at: createOrder.dataValues.created_at,
      updated_at: createOrder.dataValues.updated_at
    }
  },

  checkStock(orderData, productData){
    
    orderValidation.checkStockProduct({products: productData})

    for (const product of productData) {
      const orderItem = orderData.products.find(order => order.id == product.id)

      if(product.stock < orderItem.quantity){
        throw new Error(`Product ${product.name} is out of stock`)
      }

      product.product_id = product.id
      product.quantity   = orderItem.quantity
    }

    return { products: productData }
  },

  async detail(orderData){

    if(!orderData.id){
      throw 'params id not found'
    }

    const get = await db.order.findOne({
      attributes:[
        "id",
        "created_at",
        "updated_at",
      ],
      include: [
        {
          attributes:[
            [literal("`products->product`.`id`"), 'id'],
            [literal("`products->product`.`price`"), 'price'],
            [literal("`products->product`.`name`"), 'name'],
            [literal("`products->product`.`stock`"), 'stock'],
            [literal("`products->product`.`sold`"), 'sold'],
            [literal("`products->product`.`created_at`"), 'created_at'],
            [literal("`products->product`.`updated_at`"), 'updated_at'],
            'quantity'
          ],
          model: db.order_item,
          as: 'products',
          required:true,
          include: [
            {
              attributes:[],
              model: db.product,
              as: 'product',
              required:true,
              where:{
                deleted_at: {
                  [Op.is]: null
                }
              },
              raw:true

            }
          ],
          where:{
            deleted_at: {
              [Op.is]: null
            }
          },

          
        }
      ],
      where : {
        id: orderData.id,
        deleted_at: {
          [Op.is]: null
        }
      },
    })
   
    return get
  },

  async delete(orderData, transaction = null){
    if(!orderData.id){
      throw 'params id not found'
    }

    const del = await db.order.update({
      deleted_at: new Date(),
    },{
      where : {
        id: orderData.id,
        deleted_at: {
          [Op.is]: null
        }
      },
      ...(transaction ? {transaction} : {})
    })

    const delItem = await db.order_item.update({
      deleted_at: new Date(),
    },{
      where : {
        order_id: orderData.id,
        deleted_at: {
          [Op.is]: null
        }
      },
      ...(transaction ? {transaction} : {})
    })
  },

}