import React from 'react';

import { Container, Message, InputWrapper, Input, InputIcon } from './styles'

const ChannelData: React.FC = () => {
    return (
        <Container>
            <Message/>

            <InputWrapper>
                <Input type="text" placeholder="Digite uma mensagem"/>
                <InputIcon/>
            </InputWrapper>
        </Container>
    )
};

export default ChannelData;