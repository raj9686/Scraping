let NodeCache = require('node-cache');

class Cache {
    constructor(ttlSeconds) {
        this.cache = new NodeCache({stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false});
    }

    get(key, storeFunction) {
        const value = this.cache.get(key);
        if (value) {
            console.log("From catch")
            return Promise.resolve(value);
        }
        return storeFunction().then((result) => {
            console.log("From live")
            this.cache.set(key, result);
            return result;
        });
    }

}

module.exports = Cache;
