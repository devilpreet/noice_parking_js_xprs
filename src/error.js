const errorResponder = (err, req, res, next) => {
    console.log("Error: ", err)
    res.header("Content-Type", 'application/json')
    var errorObj = errorObjectGenerator(err)
    res.status(errorObj.statusCode).send(JSON.stringify(errorObj, null, 4)) // pretty print
}

const errorObjectGenerator = (error) => {
    if(error instanceof ValidationError) {
        return error
    }else {
        return {
            errMsg: error.message,
            statusCode: error.statusCode
        }
    }
}

const validateNumber = (num,message) => {
    if(typeof num == "number" && (num >= 1)) {
        return true;
    }else {
        throw new ValidationError(message+" value: "+num)
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "Validation Error";
        this.statusCode = 500;
        this.errMsg = message
    }
}

class DataValueError extends Error {
    constructor(message) {
        super(message);
        this.name = "Data Error";
        this.statusCode = 501;
        this.errMsg = message
    } 
}

class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = "Database Error";
        this.statusCode = 502;
        this.errMsg = message
    } 
}

module.exports = {
    errorResponder,
    validateNumber,
    ValidationError,
    DataValueError,
    DatabaseError
}