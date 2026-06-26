import '../../../i18n/i18n'
import { useTranslation } from 'react-i18next';

import { Container, 
        HashtagIcon,
        Title,
        Separator,
        Description,
        LanguageArea,     
        LanguageButton } from '../../../../components/ChannelInfo/styles'; 
import type { ChannelInfoProps } from '../entity/channelInfo';



export default function ChannelInfo({ title, description }: ChannelInfoProps) {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };
        
    return (
        <Container>
            <HashtagIcon />

            <Title>{title}</Title>

            <Separator />
            
            <Description>{description || t('Nenhuma descrição')}</Description>

            <LanguageArea>
                <LanguageButton 
                    onClick={() => changeLanguage('pt')}
                    $isActive={i18n.language.startsWith('pt')}
                >
                    Português(BR)
                </LanguageButton>
                <LanguageButton 
                    onClick={() => changeLanguage('en')}
                    $isActive={i18n.language.startsWith('en')}
                >
                    English(US)
                </LanguageButton>
            </LanguageArea>
        </Container>
    )
};