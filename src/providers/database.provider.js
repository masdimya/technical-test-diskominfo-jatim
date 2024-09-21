require('dotenv').config();
const {Sequelize} = require('sequelize'); 
const path = require( 'path' )
const fs = require('fs');


module.exports = {
  async init(){
    const db = {}

    db.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || '5432',
      dialect: 'mysql',
      define: {
        timestamps: false,
      },
    })


    return db
  },
  loadModel(){
    const dirpath = path.resolve(__dirname,'../database/models')
    return new Promise((resolve,reject)=>{
      if(global.db == null || typeof(global.db) == 'undefined'){
        reject(new Error('Db object not found'));
      }
      fs.readdir(dirpath, (err, files) => {
        if (err) {
          console.error('Error reading directory models :', err);
          reject(new Error('Error reading directory models'));
          return ;
        }
    
        files.forEach(file => {
          let filepath = `${dirpath}/${file}`

          if(file == '.gitkeep'){
            return;
          }
    
          fs.stat(filepath, (err, stats) => {
              if (err) {
                console.error('Error checking file stats:', err);
                reject(new Error('Error checking file stats:'));
                return;
              }
    
              const modelName = filepath.replace(dirpath,"").replace("/","").split('.model.js')[0]
              db[modelName]=require( path.resolve( filepath ) )(db.sequelize)
          });
        });
    
    
        resolve(true)
      })
    })
      
  },

  loadRelation(){
    const dirpath = path.resolve(__dirname,'../database/relations')
    return new Promise((resolve,reject)=>{
      if(global.db == null || typeof(global.db) == 'undefined'){
        reject(new Error('Db object not found'));
      }
      fs.readdir(dirpath, (err, files) => {
        if (err) {
          console.error('Error reading directory relations :', err);
          reject(new Error('Error reading directory relations'));
          return ;
        }
    
        files.forEach(file => {
          let filepath = `${dirpath}/${file}`

          if(file == '.gitkeep'){
            return;
          }
    
          fs.stat(filepath, (err, stats) => {
              if (err) {
                console.error('Error checking file stats:', err);
                reject(new Error('Error checking file stats:'));
                return;
              }
    
              require( path.resolve( filepath ) )()
          });
        });
    
    
        resolve(true)
      })
    })
      
  }
  
};