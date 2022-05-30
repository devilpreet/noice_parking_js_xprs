var config = require("../config")
var memStore = require("./memoryStore")

class StoreManager {
    constructor() {
        if(config.STORE_TYPE==0) {
            console.log("Initialized with IN MEMORY store")
            this._store = memStore
        }else if(config.STORE_TYPE==1) {
            console.log("TODO Initialized with POSTGRES store")
        }else {
            // Stop the application Error !!
            throw new Error("Incorrect store type found in configuration: ", STORE_TYPE)
        }
        
    }

    getAllSpaces() {
        return this._store.getAllSpaces();
    }

    createSpace(totalSlots) {
        return this._store.createSpace(totalSlots)
    }

    unparkCar(ticketId) {
        return this._store.unparkCar(ticketId);
    }

    parkCar(spaceId) {
        return this._store.parkCar(spaceId);
    }

    getAvailableSlots(spaceId) {
        return this._store.getAvailableSlots(spaceId);
    }
}

var manager = new StoreManager()

module.exports = manager