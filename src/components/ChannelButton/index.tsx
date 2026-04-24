import React from 'react';

import { Container, HashtagIcon, InviteIcon, SettingsIcon } from './styles';

export interface Props {
    ChannelName: string;
    selected?: boolean;
}

const ChannelButton: React.FC<Props> = ({ 
    ChannelName, 
    selected 
}) => {
    return (
        <Container className={selected ? 'active' : undefined}>

            <div>
                <HashtagIcon />
                <span>{ChannelName}</span>
            </div>

            <div>
                <InviteIcon />
                <SettingsIcon />
            </div>
        </Container>
    )
};

export default ChannelButton;