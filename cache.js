const Redis = require("ioredis");
const redis = new Redis(); // Default port for Redis is 6379

// Function to set data in cache with TTL
async function setCache(key, value, ttl = 3600) {
  await redis.set(key, JSON.stringify(value), "EX", ttl);
}

// Function to get data from cache
async function getCache(key) {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

module.exports = { setCache, getCache };
