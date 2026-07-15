import { Button } from '../styles/stylesServerButton';
import Logo from '../../../../../src/assets/Logo.svg'
import type { ServerButtonProps } from '../entity/server';

export default function ServerButton({
    selected,
    isHome,
    hasNotifications,
    mentions,
    title
}: ServerButtonProps) {
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
            $isHome={isHome}
            $hasNotifications={hasNotifications}
            $mentions={mentions}
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
