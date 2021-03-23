const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done);
  });
});

describe('GET /api/v1/emojis', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/emojis')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [ '😀', '🍺', '☘️', '🚀' ], done);
  });
});

describe('GET api/v1/faqs', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/faqs')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{"_id":"605a5086c48466829407d9e7","question":"this is another question","answer":"and thats is a answer","videoUrl":"http://youtube.com/answer","__v":0},{"_id":"605a50acc48466829407d9e9","question":"this is one question","answer":"Somente answer with no video","__v":0},{"_id":"605a5136fdd731553c35c797","question":"anotehr question","answer":"sample answer","__v":0},{"_id":"605a5887a57f3e4a8c46c3c0","question":"another question","answer":"altered","videoUrl":"https://someurl.com/","__v":0},{"_id":"605a60faba3d49d758e60ca7","question":"another question","answer":"no, dunno","videoUrl":"https://someurl.com/","__v":0}], done);
  });
});

describe('GET /api/v1/faqs/:id', () => {
  it('responds with the faq in json', (done) => {
    request(app)
      .get('/api/v1/faqs/605a5887a57f3e4a8c46c3c0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {"_id":"605a5887a57f3e4a8c46c3c0","question":"another question","answer":"altered","videoUrl":"https://someurl.com/","__v":0}, done);
  });
});

describe('GET /api/v1/mars-weather', () => {
  it('responds with mars weather', (done) => {
    request(app)
      .get('/api/v1/mars-weather')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
