const redisClient = require('redis');

module.exports = class AsyncRedis {
	constructor(options) {
		this._client = redisClient.createClient(options);
	}

	/**
	 * @method get
	 * @description this method return value by key from Redis
	 * @param {string} key
	 * @return Promise
	 */
	get(key) {
		return new Promise((resolve, reject) => {
			this._client.get(key, (err, value) => {
				err ? reject(err) : resolve(value);
			});
		});
	}

	set({ key, value }) {
		return new Promise((resolve, reject) => {
			this._client.set(key, value);
			return resolve(true);
		});
	}

	getObject(key) {
		return new Promise((resolve, reject) => {
			this._client.get(key, (err, value) => {
				if (err) return reject(err);
				value = JSON.parse(value);
				return resolve(value);
			});
		});
	}

	setObject({ key, object }) {
		return new Promise((resolve, reject) => {
			object = JSON.stringify(object);
			this._client.set(key, object);
			return resolve(true);
		});
	}

	expireSetObject({ key, object, time }) {
		return new Promise((resolve, reject) => {
			object = JSON.stringify(object);
			this._client.set(key, object, 'EX', time);
			return resolve(true);
		});
	}

	updateObject({ key, object }) {
		return new Promise((resolve, reject) => {
			this._client.del(key, (err, reply) => {
				if (err) return reject(new Error(err));
				object = JSON.stringify(object);
				this._client.set(key, object);
				return resolve(true);
			});
		});
	}

	expireUpdateObject({ key, object, time }) {
		return new Promise((resolve, reject) => {
			this._client.del(key, (err, reply) => {
				if (err) return reject(new Error(err));
				object = JSON.stringify(object);
				this._client.set(key, object, 'EX', time);
				return resolve(true);
			});
		});
	}

	expireSet({ key, value, time }) {
		return new Promise((resolve, reject) => {
			this._client.set(key, value, 'EX', time);
			return resolve(true);
		});
	}

	/**
	 * @method multiset
	 * @description this method add key:value to Redis
	 * @param {object} object
	 * @return Promise
	 */
	multiSet(object) {
		return new Promise((resolve, reject) => {
			//console.log(Object.keys(object));
			if (Object.keys(object).length < 1) return reject('Not found data');
			for (const key in object) {
				if (object.hasOwnProperty(key)) {
					this._client.set(key, object[key]);
				}
			}
			return resolve('Set finish');
		});
	}

	/**
	 * @method hmset
	 * @param {*} key
	 * @param {*} object
	 */
	hmset(key, object) {
		return new Promise((resolve, reject) => {
			//console.log(Object.keys(object));
			if (Object.keys(object).length < 1) return reject('Not found data');
			this._client.hmset(key, object);
			return resolve('Set finish');
		});
	}

	hgetall(key) {
		return new Promise((resolve, reject) => {
			this._client.hgetall(key, (err, obj) => {
				if (err) return reject(err);
				return resolve(obj);
			});
		});
	}

	zrevrangebyscore(params) {
		return new Promise((resolve, reject) =>
			this._client.zrevrangebyscore(params, (err, data) => (err ? reject(err) : resolve(data)))
		);
	}

	zadd(params) {
		return new Promise((resolve, reject) =>
			this._client.zadd(params, (err, data) => (err ? reject(err) : resolve(data)))
		);
	}

	del(key) {
		return new Promise((resolve, reject) => {
			this._client.del(key, (err, reply) => {
				if (err) return reject(err);
				if (reply === 1) {
					return resolve(true); //console.log("Key was deleted");
				} else {
					return reject(); //console.log("Does't exists");
				}
			});
		});
	}
	flushall() {
		return new Promise((resolve, reject) => {
			this._client.flushall();
			return resolve(true);
		});
	}

	quit() {
		this._client.quit();
	}

	end() {
		this._client.end(true);
	}
};
