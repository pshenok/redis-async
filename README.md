Install:

```sh
$ npm i --save redis-asynchronous
```


Example: 

```js
const RedisAsync = require('redis-asynchronous');

const options = {
    host: '127.0.0.1',  // redis server host
    port: 6379          // redis server port
};

const redis = new RedisAsync(options); //create instance

redis.set({key: 'foo', value: 'bar'}).then(async ()=> {
    try {
        let result = await redis.get('foo');    // result = 'bar'
        console.log(result);                    // bar
    } catch (error) {
        console.error(error);
    }
});
```

