import { Router } from 'express';
import { ServerController } from '../controllers/serverController.ts';

const router = Router();
const controller = new ServerController();

router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete);

export default router;
