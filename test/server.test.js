const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)

describe('Endpoint Tests',  () =>  {
    it('Should be up', function(done) {
        request.get('/healthCheck')
        .expect(200,done)
    })

})