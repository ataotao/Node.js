function init_cache() {
    var init_data = {
        cache_date: 10,
        localtion: '/tmp',
        algorithm: 'lru',
        item_size: 1024,
        storage_type: 'btree'
    };

    var a = arguments;

    for (var i = 0; i < a.length; i++) {
        if (typeof a[i] == 'object') {
            init_data = a[i];
            break;
        } else if (typeof a[i] == 'number') {
            init_data.cache_size = a[i];
            break;
        } else {
            throw new Error('bad cache init param');
        }
    }

    return init_data;
}

console.log(init_cache());

try {
    console.log(init_cache(false));
} catch (error) {
    console.log(error.message);
}

console.log(init_cache({
    cache_date: 1000,
    localtion: '/tmp',
    algorithm: 'lru',
    item_size: 1024,
    storage_type: 'btree'
}));
console.log(init_cache(200));


var x = function XFN(){
    throw new Error('error');
};
x();