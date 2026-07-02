import React from 'react';

import { Grid } from './styles'

import ServerList from '../infra/domain/server/useCase/serverListServer';
import ServerName from '../infra/domain/server/useCase/serverNameServer';
import ChannelInfo from '../infra/domain/channel/useCase/channelInfoServer';
import ChannelList from '../infra/domain/channel/useCase/channelListServer';
import UserInfo from '../infra/domain/user/useCase/userinfo';
import ChannelData from '../infra/domain/channel/useCase/channelDataServer';
import UserList from '../infra/domain/user/useCase/userListServer';


const Layout: React.FC = () => {
    return (
        <Grid>
            <ServerList/>
            <ServerName />
            <ChannelInfo />
            <ChannelList />
            <UserInfo />
            <ChannelData />
            <UserList />
        </Grid>
    )
};

export default Layout;