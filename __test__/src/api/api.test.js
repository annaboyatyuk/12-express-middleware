'use strict';


const superagent = require('superagent');

import app from '../../../src/app';




// import superAgent from 'superagent';
// const app = require('../../src/app');
// 


describe('app', () => {

  beforeAll( () => {
    app.start(3008);
  });
  afterAll( () => {
    app.stop();
  });


  it('should return 400 bad request when no id was provided', () => {
    return superagent
      .get('http://localhost:3008/api/v1/coffee')
      .catch(err => {
        expect(err.response.text).toBe('Bad Request');
        expect(err.status).toBe(400);
      });
  });



  it('should return 200 and contain response body for request made with valid id', () => {
    let object = {'name':'sldkjfoei'};
    return superagent
      .post('http://localhost:3008/api/v1/coffee')
      .send(object)
      .then(data => {
        return superagent
          .get(`http://localhost:3008/api/v1/coffee/${data.body.id}`)
          .then(response => {
            expect(response.body.id).toBe(data.body.id);
          });
      });
  });

  it('should return 400 bad request when there is no body content or invalid body content', () => {
    return superagent
      .post('http://localhost:3008/api/v1/coffee')
      .catch(err => {
        expect(err.response.text).toBe('Bad Request');
        expect(err.status).toBe(400);
      });
  });

  it('should  respond with the body content', () => {
    let object = {'roast': 'one name', 'coffee': 'such content'};
    return superagent
      .post('http://localhost:3008/api/v1/coffee')
      .send(object)
      .then(data => {
        console.log(data.body);
        expect(data.body.coffee).toBe('such content');
      });
  });

});



// const apiUrl = 'http://localhost:3001/api/v1/coffee';


// describe('api module', () => {
  
//   beforeEach(() => {
//     app.start(3001);
//   });
  
//   afterEach(() => {
//     app.stop();
//   });
//   it('should get zero notes', () => {

//     // note that returning promise makes this test async, could also use 'done' argument
//     return superAgent
//       .get(apiUrl)
//       .then(results => {
        
//         const notes = JSON.parse(results.text);

//         expect(notes).toEqual({});
        
//       });

//   });

//   it('should create a note', (done) => {

//     const newNote = {roast:'milk', coffee: 'chocolate'};

//     superAgent.post(apiUrl).send(newNote).then(results => {

//       const note = JSON.parse(results.text);

//       expect(note.roast).toBe('milk');

//       done(); // using done argument vs. returning promise but both work
//     });

//   });

//   it('should get all notes', () => {

//     const newNote = {roast:'milk', coffee: 'chocolate'};

//     return superAgent.post(apiUrl).send(newNote).then(results => {

//       return superAgent.get(apiUrl).then(results => {
        
//         const notes = JSON.parse(results.text);

//         expect(Object.keys(notes).length).toBe(2);
//       });
//     });

//   });

//   it('should get single note', () => {

//     const newNote = {roast:'milk', coffee: 'chocolate'};

//     return superAgent.post(apiUrl).send(newNote).then(results => {

//       const postedNote = JSON.parse(results.text);

//       return superAgent.get(apiUrl + '/' + postedNote.id).then(results => {
        
//         const retrievedNote = JSON.parse(results.text);

//         expect(retrievedNote.coffee).toBe('chocolate');
//       });
//     });

//   });

// });





