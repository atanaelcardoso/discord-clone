import React from 'react';

import { Grid } from './styles'

import ServerList from '../../infra/domain/serverList/useCase/serverListServer';
import ServerName from '../../infra/domain/serverName/useCase/serverNameServer';
import ChannelInfo from '../../infra/domain/channelInfo/useCase/channelInfoServer';
import ChannelList from '../../infra/domain/channelList/useCase/channelListServer';
import UserInfo from '../../infra/domain/userInfo/useCase/userinfo';
import ChannelData from '../../infra/domain/channelData/useCase/channelDataServer';
import UserList from '../../infra/domain/userList/useCase/userListServer';

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