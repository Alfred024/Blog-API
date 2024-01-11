const express = require('express');

const Store = require('../store/postgresql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
//Select JOIN (params: 2 tables, 1 param)
router.get('/:table/my-blogs/:id', get_blogs_of_blogger);
//Select BY param (email)
router.get('/:table/email/:email', get_user_blogger_by_email);
router.post('/:table', insert);
router.put('/:table/:id', update);
router.patch('/:table/:id', update);
router.delete('/:table/:id', delete_by_id);

async function list(req, res, next) {
    const data = await Store.select_all(req.params.table);
    res.send(data);
}

async function get(req, res, next) {
    const data = await Store.select_where(req.params.table, req.params.id);
    res.send(data);
}

async function get_blogs_of_blogger(req, res, next) {
    //const data = await Store.select_join_blog_and_blogger(req.params.table, req.params.id);
    const data = await Store.select_join(req.body);
    res.send(data);
}

async function get_user_blogger_by_email(req, res, next) {
    const data = await Store.select_by_param_name(req.body);
    res.send(data);
}

async function insert(req, res, next) {
    const table = req.params.table;
    data = await Store.insert(table, req.body);
    res.send(`Rows affected: ${data.rowCount}`);
}

async function update(req, res, next) {
    const data = await Store.update_by_params(req.params.table, req.body, req.params.id);
    res.send(data);
}

async function delete_by_id(req, res, next) {
    const data = await Store.delete_by_id(req.params.table, req.params.id);
    res.send(data);
}


module.exports = router;