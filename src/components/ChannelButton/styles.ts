import styled from "styled-components";
import { Hashtag } from "styled-icons/heroicons-outline";
import { PersonAdd , Settings } from "styled-icons/material";

export const Container = styled.div`
    grid-area: CL;
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

        // faz os icones aparecerem quando o mouse passar por cima do canal ou quando o canal estiver ativo
        > div:last-child svg {
            display: inline;
        }   
    }
        // esconde os icones quando o mouse não estiver passando por cima do canal e quando o canal não estiver ativo
        > div:last-child svg {
            display: none;
        }   
`;

export const HashtagIcon = styled(Hashtag)`
    width: 20px;
    height: 20px;

    color: var(--symbol);
`;

export const InviteIcon = styled(PersonAdd)`
    width: 16px;
    height: 16px;

    color: var(--symbol);
    cursor: pointer;

    transition: color 0.2s;

    &:hover {
        color: var(--white);}
`;

export const SettingsIcon = styled(Settings)`
   width: 16px;
    height: 16px;

    margin-left: 4px;

    color: var(--symbol);
    cursor: pointer;

    transition: color 0.2s;

    &:hover {
        color: var(--white);}
`;