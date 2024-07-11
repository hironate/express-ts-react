import express from 'express';
import { UserController } from '../controllers/userController';

const router = express.Router();
const userController = new UserController();

router.get(
  '/api/users/:id',
  async (req, res) => await userController.getUser(req, res),
);
router.post(
  '/api/users',
  async (req, res) => await userController.createUser(req, res),
);

export default router;
