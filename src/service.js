var model = require('./models/model')

function getParkingSpaces() {
    return model.getAllSpaces();
}

function createParkingSpace(totalSlots) {
    return model.createSpace(totalSlots)
}

function parkCar(spaceId) {
    return model.parkCar(spaceId)
}

function unparkCar(ticketId) {
    return model.unparkCar(ticketId)
}

module.exports = {
    getParkingSpaces,
    createParkingSpace,
    parkCar,
    unparkCar,
}