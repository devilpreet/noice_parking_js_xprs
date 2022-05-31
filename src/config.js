const env = process.env

const DB = {
    HOST: env.DB_HOST || "localhost",
    USER: env.DB_USER || "myusername",
    PASSWORD: env.DB_PASSWORD || "mypassword",
    PORT: env.DB_PORT || "5432",
    DB_NAME: env.DB_NAME || "noice_parking"
};

const IS_PROD = env.PRODUCTION === "TRUE";
var store_type = IS_PROD ? 1 : 0;

module.exports = {
    /* APP Configurations */
    PORT: 3000,

    /* Storage Switch based on Strategy Pattern */
    //STORE_TYPES: ["IN_MEMORY", "POSTGRES"],
    STORE_TYPE: store_type,

    DB_URL: `postgresql://${DB.USER}:${DB.PASSWORD}@${DB.HOST}:${DB.PORT}/${DB.DB_NAME}`
}