'use strict';

import storage from '../lib/storage/data-store.js';
import uuid from 'uuid/v1';


class Grapes{

  constructor(config) {
    this.type = 'Grapes';
    this.id = uuid();
    this.createdOn = new Date();
    this.name = config && config.name || '';
    this.grapes = config && config.grapes || '';
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

export default Grapes;
