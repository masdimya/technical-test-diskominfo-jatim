module.exports = () => {
  db.order.hasMany(db.order_item, {
    foreignKey: 'order_id',
    as: 'products',
  })

  db.order_item.belongsTo(db.product, {
    foreignKey: 'product_id',
    as: 'product',
  })
}