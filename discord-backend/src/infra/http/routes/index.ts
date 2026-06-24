import { Router } from 'express';
import userRoutes from './user.routes.ts';
import serverRoutes from './server.routes.ts';
import channelRoutes from './channel.routes.ts';
import messageRoutes from './message.routes.ts';
import roleRoutes from './role.routes.ts';

const appRoutes = Router();

appRoutes.use('/users', userRoutes);
appRoutes.use('/servers', serverRoutes);
appRoutes.use('/channels', channelRoutes);
appRoutes.use('/messages', messageRoutes);
appRoutes.use('/roles', roleRoutes);

export default appRoutes;
