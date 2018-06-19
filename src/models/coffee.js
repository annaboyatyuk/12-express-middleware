'use strict';

import storage from '../lib/storage/data-store.js';
import uuid from 'uuid/v1';


class Coffee{

  constructor(config) {
    console.log(config);
    this.type = 'Coffee';
    this.id = uuid();
    this.createdOn = new Date();
    this.roast = config && config.roast || '';
    this.coffee = config && config.coffee || '';
  }


  save() {
    return storage.save(this);
  }

  static fetchAll() {
    return storage.getAll();
  }

  static findOne(id) {
    return storage.get(id);
  }

  static updateOne(id, body) {
    return storage.update(id, body);
  }

  static deleteOne(id) {
    return storage.delete(id);
  }

}

export default Coffee;
