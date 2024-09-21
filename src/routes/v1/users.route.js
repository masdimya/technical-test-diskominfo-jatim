const {logMethod} = require('../../middlewares/log.middleware')

module.exports = (router) => {
  router.get('/',[logMethod],(req,res)=> {
    res.send('user v1')
  })

  router.post('/',[logMethod], async (req,res)=> {
    const user = await db.user.create({
      email:"test@mail",
      password: "testpassword",
      name: "hello",
      name: "bkl",
    })

    res.send(user)
  })

  return router


}