import { Router } from 'express';
import { MessageController } from '../controllers/messageController.ts';

const router = Router();
const controller = new MessageController();

router.get('/:channelId', controller.getByChannel);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

export default router;
