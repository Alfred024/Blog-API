require('dotenv').config();

module.exports = {
    api:{
        port: process.env.API_PORT || 3000,
    },
    postgresql:{
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
}