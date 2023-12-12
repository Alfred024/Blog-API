
const TABLE = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if( !store ){
        store = [];
    }

    async function get(id) {
        return {
            "get_test_status": "SUCCESS",
        }
        //return await store.get(TABLE, id);
    }
    
    return {
        get,
    };
}