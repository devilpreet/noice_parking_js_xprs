var logic = require("../logic")

/* Initialization */
var spaces = [
    {
        id: 1,
        totalSlots: 2
    }
]

var slots = [
    {
        id:1,
        spaceId: 1,
        slotNo:1,
        slotstatus:1
    },
    {
        id:2,
        spaceId: 1,
        slotNo:2,
        slotstatus:0

    }
]

var tickets = [
    {
        id: 1,
        slotid:1,
        amount:-1,
        inTime: '"2022-05-30T12:18:05.851Z"',
        outTime: -1
    }
]

function getAllSpaces() {
    return spaces;
}

function createSpace(nbSlots) {
    var newSpace = {
        id:spaces.length+1,
        totalSlots:nbSlots
    }
    spaces[spaces.length]=newSpace
    
    for(var i=0; i<nbSlots; i++) {
        var newSlot = {
            id: slots.length+1,
            spaceId: newSpace.id,
            slotNo: i+1,
            slotstatus:0
        }
        slots[slots.length]=newSlot
    }
    return newSpace
}

function parkCar(spaceId) {
    var available = slots.filter(s => s.spaceId==spaceId && s.slotstatus==0)
        .sort((a,b) => a.slotNo-b.slotNo)[0]
    if(available) {
        //Park car
        available.slotstatus=1
        //Create parking ticket
        var newTicket = {
            id: tickets.length+1,
            slotId: available.id,
            amount:-1,
            inTime: JSON.stringify(new Date()),
            outTime:-1
        }
        tickets[tickets.length]=newTicket
        return newTicket;
    }else {
        throw new Error("No available slot in the parking space!")
    }
}

function unparkCar(ticketId) {
    //Find if there is a car parked with parkingId in given space
    var ticket = tickets.find(t => t.id==ticketId)
    if(ticket) {
        //Check if parking is already completed
        if(ticket.outTime!=-1 || ticket.amount!= -1) {
            throw new Error("Used Parking Ticket. Car already out. Report if stolen !!")
        }else {
            //Unpark it
            var slot = slots.find(s => s.id==ticket.slotid)
            slot.slotstatus=0;
            var outTime = new Date();
            ticket.outTime = JSON.stringify(outTime)
            var inTime = new Date(JSON.parse(ticket.inTime))
            //Update amount
            ticket.amount = logic.calculateAmount(inTime,outTime)
            //Note: Shallow copy until complex object
            var {slotid, ...toReturn} = ticket
            toReturn.spaceId = slot.spaceId;
            toReturn.slotNo = slot.slotNo;
            return toReturn
        }
        
    }else {
        throw new Error(`No Parking ticket found with Id: ${ticketId}`)
    }
}

function getAvailableSlots(spaceId) {
    return slots.filter(s => s.spaceId==spaceId && s.slotstatus==0).length
}

module.exports = {
    getAllSpaces,
    createSpace,
    parkCar,
    unparkCar,
    getAvailableSlots
}