import { Router } from 'express';
import { ChannelController } from '../controllers/channelController.ts';

const router = Router();
const controller = new ChannelController();

router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete);

export default router;
