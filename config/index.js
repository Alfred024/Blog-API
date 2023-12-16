require('dotenv').config();

module.exports = {
    api:{
        port: process.env.API_PORT || 3000,
    },
    postgresql_service:{
        port: process.env.PG_SRV_PORT,
        host: process.env.PG_SRV_HOST,
    },
    postgresql_database:{
        port: process.env.PG_PORT,
        host: process.env.PG_HOST,
        database: process.env.PG_NAME,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
    },
}