const {logMethod} = require('../../middlewares/log.middleware')

module.exports = (router) => {
  router.get('/',[logMethod],(req,res)=> {
    res.send('user v1')
  })

  return router


}