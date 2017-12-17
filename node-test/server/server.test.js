const request = require('supertest');
const expect = require('expect');

var app = require('./server.js').app;

describe('Server',()=>{
  describe('Root',()=>{
    it('should return hello response', (done)=>{
      request(app)
        .get('/')
        .expect(404)
        .expect((res)=>{
          expect(res.body).toInclude({
            errorMessage:'Page Not Found'
          })
        })
        .end(done);

    });
  });
  describe('User',()=>{
    it('should verify me in the user array',(done)=>{
      request(app)
      .get('/user')
      .expect(200)
      .expect((res)=>{
        expect(res.body).toInclude({name:'buLLDozER',age:22});

      })
      .end(done);
    });
  });
});
