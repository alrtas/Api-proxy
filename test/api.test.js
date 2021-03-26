const request = require('supertest');

const app = require('../src/app');

describe('GET /', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done);
  });
});

describe('GET /emojis', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/emojis')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [ '😀', '🍺', '☘️', '🚀' ], done);
  });
});

describe('GET /faqs', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/faqs')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{"_id":"605a5086c48466829407d9e7","question":"this is another question","answer":"and thats is a answer","videoUrl":"http://youtube.com/answer","__v":0},{"_id":"605a50acc48466829407d9e9","question":"this is one question","answer":"Somente answer with no video","__v":0},{"_id":"605a5136fdd731553c35c797","question":"anotehr question","answer":"sample answer","__v":0},{"_id":"605a5887a57f3e4a8c46c3c0","question":"another question","answer":"altered","videoUrl":"https://someurl.com/","__v":0},{"_id":"605a60faba3d49d758e60ca7","question":"another question","answer":"no, dunno","videoUrl":"https://someurl.com/","__v":0}], done);
  });
});

describe('GET /faqs/:id', () => {
  it('responds with the faq in json', (done) => {
    request(app)
      .get('/faqs/605a5887a57f3e4a8c46c3c0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {"_id":"605a5887a57f3e4a8c46c3c0","question":"another question","answer":"altered","videoUrl":"https://someurl.com/","__v":0}, done);
  });
});

describe('GET /mars-weather', () => {
  it('responds with mars weather', (done) => {
    request(app)
      .get('/mars-weather')
      .set({ 'X-API-KEY': '12345', Accept: 'application/json' })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /config/limiters', () => {
  it('is empty so responds with 204', (done) => {
    request(app)
      .get('/config/limiters')
      .set('Accept', 'application/json')
      .expect(204,  done);
  });
});

describe('POST /config/limiters', () => {
  it('responds with 200 ok, success message and id', (done) => {
    request(app)
      .post('/config/limiters')
      .set('Accept', 'application/json')
      .send({window: "1",requestes: "100",type:"ip",activated:"true"})
      .expect(200,  done);
  });
});
describe('POST Again /config/limiters', () => {
  it('responds with 409 Conflic', (done) => {
    request(app)
      .post('/config/limiters')
      .set('Accept', 'application/json')
      .send({window: "1",requestes: "100",type:"ip",activated:"true"})
      .expect(409,  done);
  });
});
describe('PUT /config/limiters', () => {
  it('Missing params so 400 Bad request', (done) => {
    request(app)
      .put('/config/limiters')
      .set('Accept', 'application/json')
      .send({window: "1",type:"ip",activated:"false"})
      .expect(400,  done);
  });
});
describe('PUT /config/limiters', () => {
  it('responds with 200 OK', (done) => {
    request(app)
      .put('/config/limiters')
      .set('Accept', 'application/json')
      .send({window: "1",requestes: "100",type:"ip",activated:"false"})
      .expect(200,  done);
  });
});
describe('GET /config/limiters', () => {
  it('responds with 200 OK', (done) => {
    request(app)
      .get('/config/limiters')
      .set('Accept', 'application/json')
      .expect(200,  done);
  });
});

describe('DELETE /config/limiters', () => {
  it('responds with 200 OK', (done) => {
    request(app)
      .delete('/config/limiters')
      .set('Accept', 'application/json')
      .expect(200,  done);
  });
});

describe('DELETE Again /config/limiters', () => {
  it('is empty so responds with 404 not found', (done) => {
    request(app)
      .delete('/config/limiters')
      .set('Accept', 'application/json')
      .expect(404,  done);
  });
});

describe('PUT /config/limiters', () => {
  it('is empty so responds with 404 Not found', (done) => {
    request(app)
      .put('/config/limiters')
      .set('Accept', 'application/json')
      .send({window: "1",requestes: "100",type:"ip",activated:"false"})
      .expect(404,  done);
  });
});




describe('GET /config/caches', () => {
  it('is empty so responds with 204 No content', (done) => {
    request(app)
      .get('/config/caches')
      .set('Accept', 'application/json')
      .expect(204,  done);
  });
});

describe('PUT /config/caches', () => {
  it('is empty so responds with 404 Not found', (done) => {
    request(app)
      .put('/config/caches')
      .set('Accept', 'application/json')
      .send({window:"1",activated:false})
      .expect(404,  done);
  });
});

describe('POST /config/caches', () => {
  it('responds with 200 OK', (done) => {
    request(app)
      .post('/config/caches')
      .set('Accept', 'application/json')
      .send({window:"1",activated:false})
      .expect(200,  done);
  });
});
describe('POST Again /config/caches', () => {
  it('Duplicate so 409 conflict', (done) => {
    request(app)
      .post('/config/caches')
      .set('Accept', 'application/json')
      .send({window:"1",activated:false})
      .expect(409, done);
  });
});

describe('PUT /config/caches', () => {
  it('Missing params 400 Bad Request', (done) => {
    request(app)
      .put('/config/caches')
      .set('Accept', 'application/json')
      .send({window:"1"})
      .expect(400,  done);
  });
});
describe('PUT /config/caches', () => {
  it('Respond with 200 OK', (done) => {
    request(app)
      .put('/config/caches')
      .set('Accept', 'application/json')
      .send({window:"1",activated:true})
      .expect(200,  done);
  });
});

describe('GET /config/caches', () => {
  it('Now responds with 200 OK', (done) => {
    request(app)
      .get('/config/caches')
      .set('Accept', 'application/json')
      .expect(200,  done);
  });
});
describe('DELETE /config/caches', () => {
  it('responds with 200 OK', (done) => {
    request(app)
      .delete('/config/caches')
      .set('Accept', 'application/json')
      .expect(200,  done);
  });
});

describe('DELETE Again /config/caches', () => {
  it('is empty so responds with 404 not found', (done) => {
    request(app)
      .delete('/config/caches')
      .set('Accept', 'application/json')
      .expect(404,  done);
  });
});