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
    if(num instanceof Number && num >= 1) {
        return true;
    }else {
        throw new ValidationError(message)
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 500;
        this.errMsg = message
    }
}

module.exports = {
    errorResponder,
    validateNumber,
    ValidationError
}