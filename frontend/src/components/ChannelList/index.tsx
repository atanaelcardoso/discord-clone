import React from 'react';

import ChannelButton from '../ChannelButton';

import { Container, Category, AddCategoryIcon } from './styles'

const ChannelList: React.FC = () => {
    return (
        <Container>
            <Category>
                <span>Canais de texto</span>
                <AddCategoryIcon />
            </Category>

            <ChannelButton ChannelName="chat-livre"/>
            <ChannelButton ChannelName="trabalho"/>
            <ChannelButton ChannelName="lolzinho"/>
            <ChannelButton ChannelName="csgo"/>
            <ChannelButton ChannelName="valorant"/>
            
           
        </Container>
    )
};

export default ChannelList;