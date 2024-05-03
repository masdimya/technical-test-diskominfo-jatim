const express = require('express')
const app = express()
const {json, urlencoded} = require('body-parser')
const routeProvider = require('./providers/route.provider')

const router = express.Router();

routeProvider.init(router)

app.use(json({ limit: '1mb' }))
app.use(urlencoded({ extended: true }))
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
})
);

app.use(router)

app.listen(3000, () => {
  console.log("Server running in port " + 3000);
});