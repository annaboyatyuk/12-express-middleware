'use strict';


const superagent = require('superagent');

import app from '../../../src/app';

describe('app', () => {

  beforeAll( () => {
    app.start(3008);
  });
  afterAll( () => {
    app.stop();
  });

  it('should return 404 for routes with not found id', () => {
    return superagent
      .get('http://localhost:3008/api/v1/notes/123')
      .catch(err => {
        expect(err.response.text).toBe('Not Found');
        expect(err.status).toBe(404);
      });
  });

  it('should return 400 bad request when no id was provided', () => {
    return superagent
      .get('http://localhost:3008/api/v1/notes')
      .catch(err => {
        expect(err.response.text).toBe('Bad Request');
        expect(err.status).toBe(400);
      });
  });



  it('should return 200 and contain response body for request made with valid id', () => {
    let object = {'name':'sldkjfoei'};
    return superagent
      .post('http://localhost:3008/api/v1/notes')
      .send(object)
      .then(data => {
        return superagent
          .get(`http://localhost:3008/api/v1/notes/${data.body.id}`)
          .then(response => {
            expect(response.body.id).toBe(data.body.id);
          });
      });
  });

  it('should return 400 bad request when there is no body content or invalid body content', () => {
    return superagent
      .post('http://localhost:3008/api/v1/notes')
      .catch(err => {
        expect(err.response.text).toBe('Bad Request');
        expect(err.status).toBe(400);
      });
  });

  it('should  respond with the body content', () => {
    let object = {'name': 'one name', 'grapes': 'such content'};
    return superagent
      .post('http://localhost:3008/api/v1/notes')
      .send(object)
      .then(data => {
        expect(data.body.grapes).toBe('such content');
      });
  });

});


