require('dotenv').config();

module.exports = {
    api:{
        port: process.env.API_PORT || 3000,
    },
    postgresqlService:{
        host: process.env.PG_SRV_HOST,
        database: process.env.PG_SRV_NAME,
        port: process.env.PG_SRV_PORT,
        user: process.env.PG_SRV_USER,
        password: process.env.PG_SRV_PASSWORD,
    },
}