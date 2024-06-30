// src/routes/userRoutes.ts
import { Router } from 'express';
import { getUser, createUser } from '../controllers/userController';

const router = Router();

router.get('/api/users/:id', getUser);
router.post('/api/users', createUser);

export default router;
