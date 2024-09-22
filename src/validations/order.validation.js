`use strict`;
const Validator = require('fastest-validator');

module.exports = {
  validate: (data, schema) => {
    const v = new Validator();
    try {
      let result = v.validate(data, schema);
      return result;
    } catch (err) {
      console.log(err);
    }
  },
  createOrder: (data) => {
    const schema = {
      products: {
        type: 'array',
        items: {
          type: 'object',
          props: {
            id: { type: 'number', positive: true, integer: true, convert: true },
            quantity: { type: 'number', positive: true, integer: true, min: 1 },
          },
        },
      },
    };

    let result = module.exports.validate(data, schema);
    
    if (result.length) {
      console.error(result);
      throw new Error('createOrder validation not valid: ', result);
    } 

    return true;
  },
  createOrderItem: (data) => {
    const schema = {
      products: {
        type: 'array',
        items: {
          type: 'object',
          props: {
            product_id: { type: 'number', positive: true, integer: true, convert: true },
            quantity: { type: 'number', positive: true, integer: true, min: 1 },
          },
        },
      },
    };

    let result = module.exports.validate(data, schema);
    
    if (result.length) {
      console.error(result);
      throw new Error('createOrder validation not valid: ', result);
    } 

    return true;
  },
  checkStockProduct: (data) => {
    const schema = {
      products: {
        type: 'array',
        items: {
          type: 'object',
          props: {
            id: { type: 'number', positive: true, integer: true, convert: true },
            name: { type: 'string', min: 3 },
            stock: { type: 'number', positive: true, convert: true, min: 0 },
          },
        },
      },
    };

    let result = module.exports.validate(data, schema);
    
    if (result.length) {
      console.error(result);
      throw new Error('checkStockProduct validation not valid: ', result);
    } 

    return true;
  },

  
}