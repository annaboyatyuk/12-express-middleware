'use strict';


import express from 'express';
// import grapes from '../models/grapes.js';
import notFound from './../middleware/404.js';

const router = express.Router();

import modelFinder from '../middleware/models.js';
router.param('model', modelFinder);


let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};

router.get('/', (req, res) => {
  res.write('GOOOD MORNING!!!!!!');
  res.end();
});


router.get('/api/v1/:model', (req, res, next) => {
  req.model.fetchAll()
    .then(data => sendJSON(res, data) )
    .catch(next);
});

router.get('/api/v1/:model/:id', (req, res, next) => {
  if(req.params.id) {
    req.model.findOne(req.params.id)
      .then(data => sendJSON(res, data))
      .catch(next);
  }
  else {
    return notFound;
  }
});

router.delete('/api/v1/:model/:id', (req, res, next) => {
  if (req.params.id) {
    req.model.deleteOne(req.params.id)
      .then(() => {
        res.statusCode = 204;
        res.end();
      })
      .catch(next);
  }
});

router.post('/api/v1/:model', (req, res, next) => {

  let record = new req.model(req.body);
  record.save()
    .then(data => sendJSON(res, data))
    .catch(next);

});


router.put('/api/v1/:model/:id', (req, res, next) => {
  if(Object.keys(req.body).length) {
    req.model.updateOne(req.params.id, req.body)
      .then(data => sendJSON(res, data))
      .catch(next);
  }
  else {
    return notFound;
  }
});


export default router;
