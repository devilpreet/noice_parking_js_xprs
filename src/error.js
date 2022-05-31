const errorResponder = (err, req, res, next) => {
    console.log("Error: ", err.message)
    res.header("Content-Type", 'application/json')
    var errorObj = errorObjectGenerator(err)
    res.status(errorObj.statusCode).send(JSON.stringify(errorObj, null, 4)) // pretty print
}

const errorObjectGenerator = (error) => {
    return {
        message: error.message,
        statusCode: 400
    }
}

module.exports = {
    errorResponder
}