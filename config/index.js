require('dotenv').config();

module.exports = {
    api:{
        port: process.env.API_PORT || 3000,
    },
    postgresqlService:{
        //Port of the local service in the project
        port: process.env.PG_SRV_PORT,
        //Port of the PostgreSQL app in the remote server
        port_app: process.env.PG_SRV_PORT_APP,
        host: process.env.PG_SRV_HOST,
        database: process.env.PG_SRV_NAME,
        user: process.env.PG_SRV_USER,
        password: process.env.PG_SRV_PASSWORD,
    },
}