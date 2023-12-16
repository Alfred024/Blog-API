
const TABLE = 'user_table';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if( !store ){
        store = [{"message": 'No DB Provided. '}];
        return;
    }

    async function list() {
        // return {
        //     "get_test_status": "SUCCESS",
        // }
        console.log('getting data from store');
        return await store.list(TABLE);
    }

    async function get(id) {
        // return {
        //     "get_test_status": "SUCCESS",
        // }
        return await store.get(TABLE, id);
    }
    
    return {
        list,
        get,
    };
}