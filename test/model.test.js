const { text } = require("express")
var model = require("../src/models/model")

describe("Model Tests", () => {
    it("Should return initial parking spaces", () => {
        expect(model.getAllSpaces().length).toEqual(1)
    })
    
    it("Should have an available slot", () => {
        expect(model.getAvailableSlots(1)>=1).toBeTruthy()
    })
    
    it("Should create a new space", () => {
        var newSpace = model.createSpace(7)
        expect(newSpace.id).toEqual(2)
        expect(newSpace.totalSlots).toEqual(7)
        expect(model.getAllSpaces().length).toEqual(2)
        expect(model.getAvailableSlots(2)).toEqual(7)
    })

    it("Should not accept invalid parking ticket", () => {
        expect(() => {model.unparkCar(10)}).toThrow(Error)
    })

    it("Should be able to park a car", () => {
        var ticket1 = model.parkCar(1)
        expect(ticket1.id).toEqual(2)
        expect(ticket1.slotId).toEqual(2)
        expect(ticket1.amount).toEqual(-1)
        var inTime = new Date(JSON.parse(ticket1.inTime))
        //Since it has just been parked <10 seconds
        expect(new Date()-inTime<10000).toBeTruthy()
    })


    it("Should NOT be able to park another car", () => {
        //All slots full
        expect(() => {model.parkCar(1)}).toThrow(Error)
    })

    it("Should unpark already parked car", () => {
        var ticket = model.unparkCar(1)
        expect(ticket.amount!=-1).toBeTruthy()
        expect(ticket.slotNo).toEqual(1)
        expect(ticket.spaceId).toEqual(1)
        expect(ticket.outTime!=-1).toBeTruthy()
    })

    it("Should unpark already parked car II", () => {
        var ticket = model.unparkCar(2)
        expect(ticket.amount!=-1).toBeTruthy()
        expect(ticket.slotNo).toEqual(2)
        expect(ticket.spaceId).toEqual(1)
        expect(ticket.outTime!=-1).toBeTruthy()
    })
    
})