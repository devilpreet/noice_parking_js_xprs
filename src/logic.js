function calculateAmount(carIn,carOut) {
    //Short circuit for invalid input
    //TODO: Covert to error
    if(carIn>=carOut) return -1;

    //Get millisecond difference
    var diffms = carOut.getTime() - carIn.getTime()
    //Conver to hour difference and apply 10 per hour rate
    return (Math.floor(diffms/3600000)+1) * 10
}

function isParked(ticket) {
    return ticket.amount == -1 && ticket.outTime == ''
}

module.exports = {
    calculateAmount,
    isParked
}