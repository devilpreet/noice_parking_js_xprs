var service = require('./service')

module.exports = function (app) {
    app.get('/healthCheck', (req,res) => {
        return res.status(200).send("Healthy")
    })

    app.get('/parking/spaces', (req,res) => {
        var spaces = service.getParkingSpaces()
        return res.status(200).send(spaces)
    })

    app.post('/parking/spaces', (req,res) => {
        const {totalSlots} = req.params
        var ticket = service.createParkingSpace(totalSlots)
        return res.status(200).send(ticket)
    })

    app.put('/parking/spaces/:id/slots',(req,res) => {
        return res.status(200).send("Park Car")
    })

    app.delete('/parking/spaces/:id/slots', (req,res) => {
        return res.status(200).send("Unpark Car")
    })
}