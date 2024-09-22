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
  createProduct: (data) => {
    const schema = {
      name: { type: 'string', min: 3 },
      price: { type: 'number', positive: true, convert: true, min: 1 },
      stock: { type: 'number', positive: true, convert: true, min: 0 },
    };

    let result = module.exports.validate(data, schema);
    
    if (result.length) {
      console.error(result);
      throw new Error('createProduct validation not valid: ', result)
    } 

    return true;
  },
  updateProduct: (data) => {
    const schema = {
      id: { type: 'number', positive: true, convert: true, },
      name: { type: 'string', min: 3 },
      price: { type: 'number', positive: true, convert: true, min: 1 },
      stock: { type: 'number', positive: true, convert: true, min: 0 },
    };

    let result = module.exports.validate(data, schema);
    
    if (result.length) {
      console.error(result);
      throw new Error('updateProducts validation not valid: ', result)
    } 

    return true;
  },

  filterProduct: (data) => {
    const schema = {
      id: {
        optional: true,
        type: 'array', items: { type: 'number', positive: true, convert: true },
      },
    };

    let result = module.exports.validate(data, schema);
    
    if (result.length) {
      console.error(result);
      throw new Error('filterProduct validation not valid: ', result);
    } 

    return true;
  },

}