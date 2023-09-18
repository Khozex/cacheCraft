const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});



const setInCache = async (key, value, client) => {
    return await client.set(key, value);
};

const getFromCache = async (key, client) => {
    let value = JSON.parse(await client.get(key));
    if (value) { 
        console.log('Cache hit');
        value = JSON.stringify(value);
        return value;
    }
    console.log('Cache miss');
    return null;
};

const deleteFromCache = async (key, client) => {
    return await client.del(key);
};

const clearCache = async (client) => {
    return await client.flushall();
};

module.exports = {
    setInCache,
    getFromCache,
    deleteFromCache,
    clearCache,
    client
};