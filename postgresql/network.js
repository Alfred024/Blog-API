const express = require('express');

const Store = require('../store/postgresql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
//router.post('/:table', insert);
//router.put('/:table/:id', update);
router.delete('/:table/:id', delete_by_id)

async function list(req, res, next) {
    const data = await Store.select_all(req.params.table);
    res.send(data);
}

async function get(req, res, next) {
    const data = await Store.select_where(req.params.table, req.params.id);
    res.send(data);
}

//Hacer las funciones de INSERT y UPDATE genéricas
// async function insert(req, res, next) {
//     const data = await Store.insert(req.params.table, req.body)
//     response.success(req, res, data, 200);
// }

// async function update(req, res, next) {
//     const data = await Store.update_by_param(req.params.table, req.body)
//     response.success(req, res, data, 200);
// }

async function delete_by_id(req, res, next) {
    const data = await Store.delete_by_id(req.params.table, req.params.id);
    res.send(data);
}


module.exports = router;