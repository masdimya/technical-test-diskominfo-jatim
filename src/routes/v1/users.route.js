module.exports = (router) => {
  router.get('/',(req,res)=> {
    res.send('user v1')
  })

  return router


}