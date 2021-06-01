import styled from 'styled-components';
import {Link} from 'react-router-dom';
import theme from './../theme';

const Boton = styled(Link)`
    background: ${(props) => props.primario ? theme.azul : props.rosa ? theme.rosa : props.azulClaro ? theme.azulClaro : props.verde ? theme.verde : '#000'};
    width: ${(props) => props.conIcono ? '15.62rem' : 'auto'}; /* 250px */
    margin-left: 1.25rem; /* 20px */
    border: none;
    border-radius: 0.625rem; /* 10px */
    color: #fff;
    font-family: 'Work Sans', sans-serif;
    height: 4rem; /* 60px */
    padding: 1.25rem 1.87rem; /* 20px 30px */
    font-size: 1.25rem; /* 20px */
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    outline: none;
 
    svg {
        /* height: ${(props) => props.iconoGrande ? '100%' : '0.75rem;'};  12px */
        fill: ${(props) => props.primario ? 'white' : '#000'};
    }

    &:hover{
        color: ${theme.negro};

        svg {
            fill: ${(props) => props.primario ? 'black' : props.rosa ? theme.rosa : props.azulClaro ? theme.azul : theme.rosa}
        }

        a{
            color: ${theme.negro};
        }
    }

    a{
        color: #fff;
        text-decoration: none; 
    }
`;

const BotonLinkExterno = styled.button`
    background: ${(props) => props.primario ? theme.azul : props.rosa ? theme.rosa : props.azulClaro ? theme.azulClaro : 'transparent'};
    width: ${(props) => props.conIcono ? '15.62rem' : props.soloIcono ? '2rem' : 'auto'}; /* 250px */
    margin-left: 1.25rem; /* 20px */
    border: none;
    border-radius: 0.625rem; /* 10px */
    color: #fff;
    font-family: 'Work Sans', 'sans-serif';
    height: ${ (props) => props.soloIcono ? '2rem' : '4rem'}; /* 60px */
    padding: ${(props) => props.soloIcono ? '5px 5px' : '1.25rem 1.87rem'}; /* 20px 30px */
    font-size: 1.25rem; /* 20px */
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    outline: none;
 
    svg {
        /* height: ${(props) => props.iconoGrande ? '100%' : '0.75rem;'};  12px */
        fill: ${(props) => props.primario ? 'white' : props.rosa ? theme.rosa : props.azulClaro ? theme.azulClaro : '#000'};
    }

    &:hover{
        color: ${theme.negro};

        svg {
            fill: ${(props) => props.primario ? 'black' : props.rosa ? theme.rosa : props.azulClaro ? theme.azulClaro : theme.rosa}
        }

        a{
            color: ${theme.negro};
        }
    }

    a{
        color: #fff;
        text-decoration: none;
        font-family: 'Work Sans', sans-serif;
        font-size: 1.25rem; /* 20px */
        font-weight: 500;  
    }

`;

export {Boton, BotonLinkExterno};