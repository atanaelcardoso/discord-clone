import { Container, HashtagIcon, InviteIcon, SettingsIcon } from '../styles/stylesChannelButton'; 
import type { ChannelButtonProps } from '../entity/channel';

export default function channelBuntton({ ChannelName, selected }: ChannelButtonProps) { 
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
  ); 
}
