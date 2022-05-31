var promise = require('bluebird');
var logic = require('../logic')

var initOptions = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);
const db = pgp(require('../config').DB);

function getAllSpaces() {
   return db.any('Select * from parking.spaces');
}

function createSpace(nbSlots) {
    return db.tx(async t => {
        var space = await t.one(`INSERT INTO parking.spaces VALUES (DEFAULT,$1) RETURNING *;`,[nbSlots])
        //TODO: Can be optimized using batch
        for(var i=0; i<nbSlots; i++) {
            await t.none(`INSERT INTO parking.slots VALUES (DEFAULT,$1,$2,0);`,[space.id,i+1])
        }
        console.log("Parking space created: ", space)
        return space
    })
}

function parkCar(spaceId) {
    return db.tx(async t => {
        var slot=await t.one(`Select * FROM parking.slots WHERE spaceid=$1 AND slotstatus=0` +
                `ORDER BY slotno LIMIT 1
                `, [spaceId])
        console.log(slot)
        if(slot) {
            //Create parking ticket
            var inTime = JSON.stringify(new Date())
            var ticket = await t.one(`INSERT INTO parking.tickets VALUES (DEFAULT,$1,-1,$2,'') RETURNING *`, [slot.id,inTime])

            //Update slot status
            await t.none(`UPDATE parking.slots SET slotstatus=1 WHERE id=$1`, [slot.id])
            return {
                id: ticket.id,
                spaceId: slot.spaceid,
                slotNo: slot.slotno,
                inTime: ticket.intime,
            };
        }else {
            throw new Error("No available slot in the parking space!")
        }
    })
}

function unparkCar(ticketId) {
    return db.tx(async t => {
        var ticket = await t.one(`Select * FROM parking.tickets WHERE id=$1;`,[ticketId])
        console.log("Ticket: ",ticket)
        if(logic.isParked(ticket)) {
            var outTime = new Date();
            var inTime = new Date(JSON.parse(ticket.intime))
            var amount = logic.calculateAmount(inTime,outTime)
            await t.none(`UPDATE parking.tickets SET amount = $1, outtime=$2 WHERE id=$3;`,
                [amount,JSON.stringify(outTime),ticket.id])
            console.log("Ticket updated: ", ticket.id)
            var slot = await t.one(`UPDATE parking.slots SET slotstatus=0 WHERE id=$1 RETURNING *;`,[ticket.slotid])
            return {
                id: ticket.id,
                spaceId: slot.spaceid,
                slotNo: slot.slotno,
                amount: amount,
                inTime: ticket.intime,
                outTime: JSON.stringify(outTime)
            }
        }else {
            throw new Error("Used Parking Ticket. Car already out. Report if stolen !!")
        }
    })
}

function getAvailableSlots(spaceId) {

}

module.exports = {
    getAllSpaces,
    createSpace,
    parkCar,
    unparkCar,
    getAvailableSlots
}