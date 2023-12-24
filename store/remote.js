//Función genérica para conectarse a X micro-servicio de Bases de datos 
//Provee los métodos al Controller del componente en la API

//Use this import if youre using node to run the API
const axios = require('axios');

//Use this import if youre using npx nodemon to run the API
//const axios = require('axios/dist/node/axios.cjs');


function connectToRemoteDBService(host, port) {
    const baseURL = `http://${host}:${port}`;

    function list(table) {
        return req('GET', table);
    }

    function get(table, id) {
        return req('GET', table, id);
    }

    function insert(table, data) {
        return req('POST', table, data);
    }

    function update(table, data) {
        return req('PUT', table, data);
    }

    function delete_by_id(table, id) {
        return req('DELETE', table, id);
    }

    function req(method, table, data) {
        const url = `${baseURL}/${table}`;
        let options = {
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if ((method === 'GET' || method === 'DELETE') && data) {
            options.url += `/${data}`;
        } else if (method === 'PUT'){
            const {id, jsonData} = data;
            options.url += `/${id}`;
            options.data = jsonData;
        } else if (data) {
            options.data = data;
        }

        return axios(options)
            .then((response) => response.data)
            .catch((error) => {
                console.error('ERROR at the http options [remote.js]', error);
                throw error.message;
            });
    }

    return {
        list,
        get,
        insert,
        update,
        delete_by_id,
    };
}

module.exports = connectToRemoteDBService;
