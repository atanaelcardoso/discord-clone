import { Container, 
        HashtagIcon,
        Title,
        Separator,
        Description } from './styles';

export interface ChannelInfoProps {
    title: string;
    description: string;
}

export default function ChannelInfo({ title, description }: ChannelInfoProps) {
    return (
        <Container>
            <HashtagIcon />

            <Title>{title}</Title>

            <Separator />
            
            <Description>{description} || 'Nenhuma descrição'</Description>
        </Container>
    )
};