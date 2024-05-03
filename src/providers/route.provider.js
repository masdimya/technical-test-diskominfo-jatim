const path = require( 'path' )
const fs = require('fs');
const express = require( 'express' );
const ROUTES_DIR = path.resolve(__dirname,'../routes')
let mainRouter = null

const loadRoute = (filepath) => {
  const router = express.Router();
  const routelist = require( path.resolve( filepath ) )(router)
  const routepath = filepath
                      .replace(ROUTES_DIR,"")
                      .split('.route.js')[0]

  mainRouter.use(routepath,routelist)
}

const loadRouteDir = (dirpath) => {
  fs.readdir(dirpath, (err, files) => {
    if (err) {
      console.error('Error reading directory routes :', err);
      throw new Error('Error reading directory routes');
    }

    files.forEach(file => {
      let filepath = `${dirpath}/${file}`

      fs.stat(filepath, (err, stats) => {
          if (err) {
            console.error('Error checking file stats:', err);
            return;
          }

          if (!stats.isDirectory()) {
            loadRoute(filepath)
            return;
          }

          loadRouteDir(filepath)
          
      });
  });

  })
}

const init = (router) => {
  mainRouter = router
  loadRouteDir(ROUTES_DIR)
}

module.exports = {
  init
}