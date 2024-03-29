require('dotenv').config();

module.exports = {
    api:{
        host: process.env.API_HOST, 
        port: process.env.API_PORT || 3000,
        api_key: process.env.API_KEY,
        secret: process.env.API_SECRET,
    },
    api_smtp:{
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        email: process.env.SMTP_EMAIL,
        password: process.env.SMTP_PASSWORD,
        api_key: process.env.SMTP_API_KEY,
    },
    postgresql_service:{
        port: process.env.PG_SRV_PORT,
        host: process.env.PG_SRV_HOST,
        api_key: process.env.PG_SRV_API_KEY,
    },
    postgresql_database:{
        port: process.env.PG_PORT,
        host: process.env.PG_HOST,
        database: process.env.PG_NAME,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
    },
}