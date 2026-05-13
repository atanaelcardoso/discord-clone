import React  from 'react';

import { 
    Container, 
    Profiler, 
    Avatar, 
    UserData, 
    Icons, 
    MicIcon, 
    HeadphoneIcon, 
    SettingsIcon  } from './styles'

const UserInfo: React.FC = () => {
    return (
        <Container>
            <Profiler>
                <Avatar/>
                <UserData>
                    <strong>Atanael</strong>
                    <span>#7777</span>
                </UserData>
            </Profiler>

            <Icons>
                <MicIcon/>
                <HeadphoneIcon/>
                <SettingsIcon/> 
            </Icons>
        </Container>
    )
};

export default UserInfo;