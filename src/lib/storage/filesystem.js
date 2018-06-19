'use strict';

import { readFile, readdir, writeFile } from 'fs';

import notFound from './../../middleware/404.js';

const storage = {};

const dataDirectory = `${__dirname}/../../../data`;

let readFilePromise = function(filename) {
  return new Promise(function(resolve, reject) {
    readFile(filename, function(err, data){
      if (err)
        reject(err);
      else
        resolve(data);
    });
  });
};

storage.getAll = () => {
  return new Promise( (resolve,reject) => {
    readdir(dataDirectory, (err,files) => {
      if(err) {
        reject(err);
      }
      let promises = [];
      if(!files) {
        return notFound;
                  
      }
      while(files.length) {
        let file = files.shift();
        file = `${dataDirectory}/${file}`;
        if ( file.match(/\.json/) ) { promises.push( readFilePromise(file) ); }
      }
   
      Promise.all(promises)
        .then(contents => {
          let database = contents.reduce( (db,data) => {
            let obj = JSON.parse(data.toString());
            db[obj.id] = obj;
            return db;
          },{});
          resolve(database);
        })
        .catch(console.log('promise all catch'));
    });
  });
};

storage.get = (id) => {
  return new Promise( (resolve,reject) => {
    let file = `${dataDirectory}/${id}.json`;
    readFile(file, (err,data) => {
      if ( data ) {
        let obj = JSON.parse(data.toString());
        resolve(obj);
      }
      else {
        console.log('jsoie;jfoe', err);
        reject(`${id} Not Found`);
      }
    });
  });
};

storage.save = (data) => {
  return new Promise( (resolve,reject) => {
    if (!data.id) {
      reject('No Record ID Specified');
    }

    let file = `${dataDirectory}/${data.id}.json`;
    let text = JSON.stringify(data);
    writeFile(file, text, (err) => {
      if(err) { reject(err); }
      resolve(data);
    });
  });
};

storage.update = (id, body) => {
  return new Promise((resolve, reject) => {
    if(!body.id) {
      reject('Not Found');
    }
    let file = `${dataDirectory}/${id}.json`;
    let text = JSON.stringify(body);

    writeFile(file, text, (err) => {
      if(err) {
        reject(err);
      }
      resolve(body);
    });
  });
};


export default storage;
