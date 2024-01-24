const TABLE = 'user_blogger';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if( !store ){
        store = [{"message": 'No DB Provided. '}];
        return;
    }

    async function get_user_blogger_by_email(data) {
        return await store.get(TABLE, data);
    }

    async function register(data) {
        return await store.insert(TABLE, data);
    }

    async function create_account(data) {
        return await store.insert('blogger', data);
    }

    async function update_user(data, id) {
        const update_data = {"id": id, "jsonData": data};
        return await store.update(TABLE, update_data);
    }

    return {
        get_user_blogger_by_email,
        register,
        create_account,
        update_user,
    };
}