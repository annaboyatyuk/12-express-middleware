'use strict';


import express from 'express';
import Notes from '../models/notes.js';

const router = express.Router();


let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};


router.get('/api/v1/notes', (req,res) => {
  Notes.fetchAll()
    .then( data => sendJSON(res,data) )
    .catch(() => {
      res.statusCode = 404;
      res.statusMessage = 'Not Found';
      res.write('Not Found');
      res.end();
    });
});

router.get('/api/v1/notes/:id', (req, res) => {
  if(req.params.id) {
    Notes.findOne(req.params.id)
      .then(data => sendJSON(res,data) )
      .catch(() => {
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        res.write('Not Found');
        res.end();
      });
  }
  else {
    res.statusCode = 404;
    res.statusMessage = 'Not Found';
    res.write('Not Found');
    res.end();
  }
});

router.delete('/api/v1/notes', (req,res) => {
  if ( req.params.id ) {
    Notes.deleteOne(req.params.id)
      .then(() => {
        res.statusCode = 204;
        res.end();
      })
      .catch(console.error);
  }
});

router.post('/api/v1/notes', (req,res) => {

  let record = new Notes(req.body);
  record.save()
    .then(data => sendJSON(res,data))
    .catch(console.error);

});


export default router;
