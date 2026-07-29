import { Container, HashtagIcon, InviteIcon, SettingsIcon } from '../styles/stylesChannelButton'; 
import type { ChannelButtonProps } from '../entity/channel';

export default function ChannelButton({ channelName, selected }: ChannelButtonProps) { 
  return ( 
    <Container className={selected ? 'active' : undefined}> 
      <div> 
        <HashtagIcon /> 
        <span>{channelName}</span> 
      </div> 
      <div> 
        <InviteIcon /> 
        <SettingsIcon /> 
      </div> 
    </Container> 
  ); 
}
