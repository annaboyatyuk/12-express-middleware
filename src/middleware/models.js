'use strict';


import requireAll from 'require-directory';
const models = requireAll(module, '../models');
// import Coffee from './../models/coffee.js';

export default (req, res, next) => {
  // req.model = Coffee;
  // next();
  try{
    let model = req && req.params && req.params.model;
    if(model && models[model] && models[model].default) {
      req.model = models[model].default;
      next();
    }
    else{
      throw 'Not Found';
    }
  }
  catch(err) {
    throw err;
  }
};