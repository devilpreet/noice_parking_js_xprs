const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)

describe('Endpoint Tests',  () =>  {
    it('Should be up', function(done) {
        request.get('/healthCheck')
        .expect(200,done)
    })

    it('Should give error on NEGATIVE slots parking space', function (done) {
        request.post('/parking/spaces')
            .send({totalSlots:-5})
            .expect((res) => {
                expect(res.body.name).toBe("Validation Error")
                expect(res.body.errMsg).toBeTruthy();
            })
            .expect(500, done)
    })

    it('Should give error on FRACTIONAL slots parking space', function (done) {
        request.post('/parking/spaces')
            .send({totalSlots:1.9})
            .expect((res) => {
                expect(res.body.name).toBe("Validation Error")
                expect(res.body.errMsg).toBeTruthy();
            })
            .expect(500, done)
    })
    
    it('Should NOT create parking space for number parseable string', function (done) {
        request.post('/parking/spaces')
            .send({totalSlots:"3.4"})
            .expect((res) => {
                expect(res.body.name).toBe("Validation Error")
                expect(res.body.errMsg).toBeTruthy();
            })
            .expect(500, done)
    })

    it('Should be able to get all parking spaces', function (done) {
        request.get('/parking/spaces')
            .expect((res) => {
                expect(res.body.length>=1).toBeTruthy()
            })
            .expect(200, done)
    })

    it('Should create parking space for number parseable string', function (done) {
        request.post('/parking/spaces')
            .send({totalSlots:"3"})
            .expect(200, done)
    })
})