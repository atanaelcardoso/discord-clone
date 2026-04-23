import React from 'react';

import { Container, HashtgIcon, Title ,Separator, Description } from './styles';

const ChannelInfo: React.FC = () => {
    return (
        <Container>
            <HashtgIcon />

            <Title>chat-livre</Title>

            <Separator />
            
            <Description>Canal aberto para coversas</Description>
        </Container>
    )
};

export default ChannelInfo;