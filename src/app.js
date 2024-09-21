const express = require('express')
const app = express()
const {json, urlencoded} = require('body-parser')
const cors = require('cors')
const routeProvider = require('./providers/route.provider')
const dbProvider    = require('./providers/database.provider')
const bcryptProvider    = require('./providers/bcrypt.provider')

const multer = require('multer');


const router = express.Router();

routeProvider.init(router)


app.use(json({ limit: '1mb' }))
app.use(urlencoded({ extended: true }))
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));
app.use(multer().any())

app.use(router)

app.listen(3000, async () => {
  console.log("Server running in port " + 3000);
  global.encrypt = bcryptProvider
  global.db = await dbProvider.init()
  await dbProvider.loadModel()
  await dbProvider.loadRelation()


  await db.sequelize.authenticate();
  console.log('Connection has been established successfully.');

  await db.sequelize.sync({ force: false, alter: false }); // or { alter: true }
  console.log('All models were synchronized successfully.');

});