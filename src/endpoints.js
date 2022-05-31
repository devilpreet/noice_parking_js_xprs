var service = require('./service')
var {ValidationError, validateNumber} = require('./error')

module.exports = function (app) {
    app.get('/healthCheck', (req,res) => {
        return res.status(200).send({message: 'Healthy'})
    })

    app.get('/parking/spaces', async (req,res) => {
        try { 
            var spaces = await service.getParkingSpaces()
            return res.status(200).send(spaces)
        } catch (e) {
            next(e)
        }
    })

    app.post('/parking/spaces', async (req,res,next) => {
        try {
            const {totalSlots} = req.body
            validateNumber(totalSlots,"Invalid/Missing totalSlots. Should be number > =1.")
            console.log("Creating space with nb slots: ", totalSlots)
            var ticket = await service.createParkingSpace(totalSlots)
            return res.status(200).send(ticket)
        } catch (e) {
            next(e)
        }
    })

    app.put('/parking/spaces/:id/slots',async (req,res,next) => {
        try {
            var spaceId = req.params.id
            var ticket = await service.parkCar(spaceId)
            return res.status(200).send(ticket)
        } catch (e) {
            next(e)
        }
    })

    app.delete('/parking/:id', async (req,res,next) => {
        try{
            var ticketId = req.params.id
            var ticket = await service.unparkCar(ticketId)
            return res.status(200).send(ticket)
        }catch (e) {
            next(e)
        }
    })

    return app;
}