
const TABLE = 'blogger';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if( !store ){
        store = [{"message": 'No DB Provided. '}];
        return;
    }

    async function list() {
        return await store.list(TABLE);
    }

    async function get(id) {
        return await store.get(TABLE, id);
    }
    
    async function insert(data){
        return await store.insert(TABLE, data);
    }

    async function update(data, id) {
        const update_data = {"id": id, "jsonData": data};
        return await store.update(TABLE, update_data);
    }

    async function delete_by_id(id) {
        return await store.delete_by_id(TABLE, id);
    }

    return {
        list,
        get,
        insert,
        update,
        delete_by_id,
    };
}