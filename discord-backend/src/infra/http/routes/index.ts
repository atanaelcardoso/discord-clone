import { Router } from 'express';
import userRoutes from './user.routes.js';
import serverRoutes from './server.routes.js';
import channelRoutes from './channel.routes.js';
import messageRoutes from './message.routes.js';
import roleRoutes from './role.routes.js';

const appRoutes = Router();

appRoutes.use('/users', userRoutes);
appRoutes.use('/servers', serverRoutes);
appRoutes.use('/channels', channelRoutes);
appRoutes.use('/messages', messageRoutes);
appRoutes.use('/roles', roleRoutes);

export default appRoutes;
