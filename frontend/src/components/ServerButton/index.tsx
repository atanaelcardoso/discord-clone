import Logo from '../../assets/Logo.svg';

import { Button } from './styles';

export interface Props {
    selected?: boolean;
    isHome?: boolean;
    hasNotifications?: boolean;
    mentions?: number;
    title?: string; 
}

export default function ServerButton({
    selected, 
    isHome,
    hasNotifications,
    mentions,
    title 
}: Props) {
    const getInitials = (name?: string) => {
        if (!name) return '';
        return name
            .split(' ')                   
            .map(word => word[0]) 
            .join('')
            .slice(0, 2)  
            .toUpperCase();
    };

    return (
        <Button
            isHome={isHome}
            hasNotifications={hasNotifications}
            mentions={mentions}
            className={selected ? 'active' : ''}
        >
            {isHome ? (
                <img src={Logo} alt="Discord" />
            ) : (
                getInitials(title)
            )}
        </Button>
    );
}