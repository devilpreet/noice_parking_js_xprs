module.exports = function (app) {
    app.get('/healthCheck', (req,res) => {
        return res.status(200).send("Healthy")
    })

    app.get('/parking/spaces', (req,res) => {
        return res.status(200).send("Display all spaces")
    })

    app.post('/parking/spaces', (req,res) => {
        return res.status(200).send("Create parking space")
    })

    app.put('/parking/spaces/:id/slots',(req,res) => {
        return res.status(200).send("Park Car")
    })

    app.delete('/parking/spaces/:id/slots', (req,res) => {
        return res.status(200).send("Unpark Car")
    })
}