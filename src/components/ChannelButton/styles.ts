import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    padding: 5px 3px;
    border-radius: 5px;

    background-color: transparent;

    transition: background-color .2s;

    > div {
        display: flex;
        align-items: center;
    }

    > div span {
        margin-left: 5px;
        color: var(--senary);
    }
        
     &:hover,
     &.active {
        background-color: var(--quinary);

         > div span {
            color: var(--white);
        }
    }
`;

export const HashtagIcon = styled.div`
    width: 24px;
    height: 24px;

    color: var(--symbol);
`;

export const InviteIcon = styled.div`
    width: 24px;
    height: 24px;

    color: var(--symbol);
`;

export const SettingsIcon = styled.div`
    width: 24px;
    height: 24px;

    color: var(--symbol);
`;
