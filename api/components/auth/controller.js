const TABLE = 'user_blogger';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if( !store ){
        store = [{"message": 'No DB Provided. '}];
        return;
    }

    async function get_user_blogger_by_email(email) {
        return await store.get(TABLE, email);
    }

    return {
        get_user_blogger_by_email,
    };
}