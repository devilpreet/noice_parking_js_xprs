module.exports = {
    /* APP Configurations */
    PORT: 3000,

    /* Storage Switch based on Strategy Pattern */
    //STORE_TYPES: ["IN_MEMORY", "POSTGRES"],
    STORE_TYPE: 1,

    DB: 'postgresql://myusername:mypassword@localhost:5432/noice_parking'
}