import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { UserRepository } from '../repositories/userRepository';
import { getRedisKey, setRedisKey } from '../redisClient';

export class UserController {
  private userService: UserService;

  constructor() {
    const userRepository = new UserRepository();
    this.userService = new UserService(userRepository);
  }

  public async getUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;

    try {
      // Check if user data is cached in Redis
      const cachedUser = await getRedisKey(`user:${userId}`);

      if (cachedUser) {
        res.json(JSON.parse(cachedUser));
        return;
      }

      // Fetch user data from MongoDB
      const user = await this.userService.getUserById(userId);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // Cache the result in Redis
      await setRedisKey(`user:${userId}`, JSON.stringify(user));

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, bio, profilePicture } = req.body;

    try {
      const user = await this.userService.createUser({
        name,
        email,
        bio,
        profilePicture,
      });

      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
