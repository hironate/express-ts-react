import { Request, Response } from 'express';
import { User } from '../models/user';
import { getRedisKey, setRedisKey } from '../redisClient';

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    // Check if user data is cached in Redis
    const cachedUser = await getRedisKey(`user:${userId}`);

    if (cachedUser) {
      return res.json(JSON.parse(cachedUser));
    }

    // Fetch user data from MongoDB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Cache the result in Redis
    await setRedisKey(`user:${userId}`, JSON.stringify(user));

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, bio, profilePicture } = req.body;

  try {
    const user = new User({ name, email, bio, profilePicture });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
