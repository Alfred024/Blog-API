//NOTA: Esnecesario agregar el módulo que se encarga de abrir el Pool e implementarlo 
const { Client } = require('pg');
const config = require('../config/index');

const connectionData = {
    port: config.postgresql_database.port,
    host: config.postgresql_database.host,
    user: config.postgresql_database.user,
    password: config.postgresql_database.password,
    database: config.postgresql_database.database,
};
const client = new Client(connectionData)

function handleCon() {
    try {
        client.connect();
        console.log('PostgreSQL DB succesfully connected');
    } catch (error) {
        console.error('[db connnection error]', error);
    }
}
handleCon();

//GENERIC FUNCTIONS
function select_all(table) {
    return new Promise((resolve, reject) =>{
        client.query(`SELECT * FROM ${table}`, (error, data) =>{
            if (error) {
                //client.end();
                return reject(error);
            }else{
                resolve(data.rows);
                //client.end()
            }
        });
    });
}

function select_where(table, id) {
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM ${table} WHERE id=${id}`, (error, data) => {
            if (error) {
                return reject(error);
            }else{
                resolve(data.rows);
            }
        })
    })
}

function delete_by_id(table, id) {
    return new Promise((resolve, reject) => {
        client.query(`DELETE FROM ${table} WHERE id=${id}`, (error, result) => {
            if (error) {
                return reject(error);
            }else{
                resolve(result);
            }
        })
    });
}

function insert_user(table, data) {
    return new Promise((resolve, reject) => {
        const {email, password, role} = data;
        const query = {
            text: `INSERT INTO ${table} (email, password, role) VALUES($1, $2, $3)`,
            values: [email, role, password],
        }
        client.query(query,(error, result) => {
            if (error) {
                return reject(error);
            }else{
                resolve(result);
            }
        })
    })
}

function update_by_param(table, data) {
    return new Promise((resolve, reject) => {
        client.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (error, result) => {
            if (error) {
                return reject(error);
            }else{
                resolve(result);
            }
        })
    })
}


module.exports = {
    select_all,
    select_where,
    insert_user,
    update_by_param,
    delete_by_id,
};


