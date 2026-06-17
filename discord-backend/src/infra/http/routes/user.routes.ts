import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

const router = Router();
const controller = new UserController();

router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

export default router;
