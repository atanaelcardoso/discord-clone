import { Container, HashtagIcon, InviteIcon, SettingsIcon } from '../../../../components/ChannelButton/styles'; 
import type { ChannelButtonProps } from '../entity/channelBuntton';

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
