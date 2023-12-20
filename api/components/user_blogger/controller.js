
const TABLE = 'user_blogger';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if( !store ){
        store = [{"message": 'No DB Provided. '}];
        return;
    }

    async function list() {
        console.log('getting data from store');
        return await store.list(TABLE);
    }

    async function get(id) {
        return await store.get(TABLE, id);
    }
    
    async function insert(data){
        return await store.insert(TABLE, data);
    }

    return {
        list,
        get,
        insert,
    };
}