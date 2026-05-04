import React, { useRef, useEffect } from 'react';

import { Container, Message, InputWrapper, Input, InputIcon } from './styles';
import ChannelMessage, { Mention} from '../ChannelMessage';

const ChannelData: React.FC = () => {
    const messagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const div = messagesRef.current;

        if (div) {
            div.scrollTop = div.scrollHeight;
        }
    }, [messagesRef]);

    return (
        <Container>
            <Message ref={messagesRef}>
                {Array.from(Array(15).keys()).map((n) => (
                <ChannelMessage
                    key={n}
                    author="John Doe"
                    date="Hoje"
                    content="Olá, como você está?"
                    hasMention={false}
                    isBot={false}
                /> 
                ))}

                <ChannelMessage
                    author="Bot"
                    date="Hoje"
                    content={
                        <>
                            <Mention>@John Doe</Mention>, não se esqueça de verificar as regras do servidor!
                        </>
                    }
                    hasMention={true}
                    isBot={true}
                />
            </Message>

            <InputWrapper>
                <Input type="text" placeholder="Digite uma mensagem"/>
                <InputIcon/>
            </InputWrapper>
        </Container>
    )
};

export default ChannelData;