'use strict';


const storage = {};

const database = {};

storage.getAll = () => {
  return Promise.resolve(database);
};

storage.get = (id) => {
  return new Promise( (resolve,reject) => {
    if (database[id]) {
      resolve(database[id]);
    }
    else {
      reject(`${id} Not Found`);
    }
  });
};

storage.save = (data) => {
  return new Promise( (resolve,reject) => {
    if (data.id) {
      database[data.id] = data;
      resolve(database[data.id]);
    }
    else {
      reject('Invalid Data (No ID)');
    }
  });
};

storage.delete = (id) => {
  return new Promise((resolve, reject) => {
    if (database[id]) {
      delete database[id];
      resolve('successfully deleted');
    }
    else {
      console.log('this is being rejected');
      reject(`${id} Not Found`);
    }
  });
};


storage.update = (id, body) => {
  return new Promise((resolve, reject) => {
    if(database[id]) {
      database[id] = body;
      database[id].id = id;
      resolve(database[id]);
    }
    else {
      reject('Not Found');
    }
  });
};

export default storage;


