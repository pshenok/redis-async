Install:

```sh
$ npm i --save redis-asynchronous
```


Example create instance:

```js

const RedisAsync = require('redis-asynchronous');

const options = {
    host: '127.0.0.1',  // redis server host
    port: 6379          // redis server port
};

const redis = new RedisAsync(options); //create instance

```

Example set/get string:

```js
redis.set({key: 'foo', value: 'bar'}).then(async ()=> {
    try {
        let result = await redis.get('foo');    // result = 'bar'
        console.log(result);                    // bar
    } catch (error) {
        console.error(error);
    }
});
```

Example expire set string: 

```js
redis.expireSet({ key: 'foo', value: 'bar', time: 60 }).then(console.log).catch(console.error); // return true || error
```
Time is indicated in seconds.


Example set/get objects:

```js
redis.setObject({ key: 'foo', object: { bar: 'baz' } }).then(async () => {
    try {
        let result = await redis.getObject('foo');      // result = { bar: 'baz' }
        console.log(result);                            // { bar: 'baz' }
    } catch (error) {
        console.error(error);
    }
});
```


