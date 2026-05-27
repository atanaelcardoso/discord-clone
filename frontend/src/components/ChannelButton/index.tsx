import { Container, HashtagIcon, InviteIcon, SettingsIcon } from './styles';
export interface ChannelButtonProps {
    ChannelName: string;
    selected?: boolean;
}

export default function ChannelButton({
    ChannelName,
    selected
}: ChannelButtonProps) {
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