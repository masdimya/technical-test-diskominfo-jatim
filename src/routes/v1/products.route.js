module.exports = (router) => {
  router.get('/',(req,res)=> {
    res.send('product v1')
  })

  return router


}