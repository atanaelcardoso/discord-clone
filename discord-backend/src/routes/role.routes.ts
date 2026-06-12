import { Router } from 'express';
import { RoleController } from '../controllers/roleController.js';

const router = Router();
const controller = new RoleController();

router.get('/:serverId', controller.getByServer);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete);

export default router;
