const { mapJsonDataToFields_Update, mapJsonDataToFields_Insert } = require('./utils/db_functions');
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
        client.query(`SELECT * FROM ${table} WHERE id_${table} = ${id}`, (error, data) => {
            if (error) {
                return reject(error);
            }else{
                resolve(data.rows);
            }
        })
    });
}

function select_join(jsonData) {
    const { main_table, secondary_table, id_secondary_table, id } = jsonData;
    const query = {text: `
    SELECT * FROM ${main_table}
    JOIN ${secondary_table} ON ${main_table}.${id_secondary_table} = ${secondary_table}.${id_secondary_table}
    WHERE ${main_table}.${id_secondary_table} = ${id};`}

    return new Promise((resolve, reject) => {
        client.query(query,(error, data) => {
            if (error) {
                return reject(error);
            }else{
                resolve(data.rows);
            }
        })
    });
}

//Arreglar el param_value, para ver si es un string o no
function select_by_param_name(jsonData) {
    const {table, param_name, param_value} = jsonData;
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM ${table} WHERE ${param_name} = '${param_value}'`, (error, data) => {
            if (error) {
                return reject(error);
            }else{
                resolve(data.rows);
            }
        })
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        const { tableFields, valuesFields } = mapJsonDataToFields_Insert(data);
        const query = {
            text: `INSERT INTO ${table} ${tableFields} VALUES ${valuesFields}`,
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

// Update if theres a PUT or PATCH request
function update_by_params(table, data, id) {
    return new Promise((resolve, reject) => {
        const dataSize = Object.keys(data).length;
        let query;

        for (let index = 0; index < dataSize; index++) {
            const { fieldName, fieldNewValue } = mapJsonDataToFields_Update(data, index);
            if (typeof fieldNewValue === 'string'){
                query = {
                    text: `UPDATE ${table} SET ${fieldName} = '${fieldNewValue}' WHERE id_${table} = ${id}`
                }
            }else{
                query = {
                    text: `UPDATE ${table} SET ${fieldName} = ${fieldNewValue} WHERE id_${table} = ${id}`
                }
            }

            client.query(query, (error, result) => {
                if (error) {
                    return reject(error);
                }else{
                    resolve(result);
                }
            });
        }
    });
}

function delete_by_id(table, id) {
    return new Promise((resolve, reject) => {
        client.query(`DELETE FROM ${table} WHERE id_${table} = ${id}`, (error, result) => {
            if (error) {
                return reject(error);
            }else{
                resolve(result);
            }
        })
    });
}

module.exports = {
    select_all,
    select_where,
    select_join,
    select_by_param_name,
    insert,
    update_by_params,
    delete_by_id,
};


