import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Create a new Redis instance
const redisClient = new Redis(REDIS_URL);

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

// Example function to set a key in Redis
export async function setRedisKey(key: string, value: string): Promise<void> {
  try {
    await redisClient.set(key, value);
    console.log('Redis key set successfully');
  } catch (err) {
    console.error('Error setting Redis key:', err);
    throw err; // Propagate error
  }
}

// Example function to get a key from Redis
export async function getRedisKey(key: string): Promise<string | null> {
  try {
    const value = await redisClient.get(key);
    console.log('Redis key retrieved successfully:', value);
    return value;
  } catch (err) {
    console.error('Error getting Redis key:', err);
    throw err; // Propagate error
  }
}

export default redisClient;
