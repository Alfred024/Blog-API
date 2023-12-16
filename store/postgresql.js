const { Client } = require('pg');
const config = require('../config/index');

const connectionData = {
    host: config.postgresqlService.host,
    user: config.postgresqlService.user,
    password: config.postgresqlService.password,
    database: config.postgresqlService.database,
};
const client = new Client(connectionData)

function handleCon() {
    try {
        client.connect();
        console.log('PostgreSQL DB succesfully connected');
    } catch (error) {
        console.error('[db err]', err);
    }
}
handleCon();

function get_all(table, id) {
    client.query(`SELECT * FROM ${table}`)
        .then(response => {
            console.log(response.rows)
            client.end()
        })
        .catch(err => {
            client.end()
        })
}

// function get_where(table, id) {
//     return new Promise((resolve, reject) => {
//         client.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
//             if (err) return reject(err);
//             resolve(data);
//         })
//     })
// }

// function upsert(table, data) {
//     if (data && data.id) {
//         return update(table, data);
//     } else {
//         return insert(table, data);
//     }
// }

// function insert(table, data) {
//     return new Promise((resolve, reject) => {
//         client.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
//             if (err) return reject(err);
//             resolve(result);
//         })
//     })
// }

// function update(table, data) {
//     return new Promise((resolve, reject) => {
//         client.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
//             if (err) return reject(err);
//             resolve(result);
//         })
//     })
// }

module.exports = {
    get_all,
    //get_where,
    //upsert,
};


