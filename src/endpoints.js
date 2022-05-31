var service = require('./service')

module.exports = function (app) {
    app.get('/healthCheck', (req,res) => {
        return res.status(200).send({message: 'Healthy'})
    })

    app.get('/parking/spaces', async (req,res) => {
        var spaces = await service.getParkingSpaces()
        return res.status(200).send(spaces)
    })

    app.post('/parking/spaces', async (req,res) => {
        const {totalSlots} = req.body
        console.log("Creating space with nb slots: ", totalSlots)
        var ticket = await service.createParkingSpace(totalSlots)
        return res.status(200).send(ticket)
    })

    app.put('/parking/spaces/:id/slots',async (req,res) => {
        
        var spaceId = req.params.id
        var ticket = await service.parkCar(spaceId)
        return res.status(200).send(ticket)
    })

    app.delete('/parking/:id', async (req,res) => {
        console.log(req.body,req.params)
        var ticketId = req.params.id
        var ticket = await service.unparkCar(ticketId)
        return res.status(200).send(ticket)
    })

    return app;
}