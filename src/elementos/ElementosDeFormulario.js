import styled from 'styled-components';
import theme from './../theme';

const ContenedorBoton = styled.div`
    display: flex;
    justify-content: center;
    margin: 2.5rem 0;  /* 40px */
`;

const Formulario = styled.form`
    padding: 0 2.5rem; /* 40px */
 
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    input, textarea {
        width: 100%;
        text-align: center;
        padding: 1.5rem 0;
        font-family: 'Work Sans', sans-serif;
        transition: ease-in .5s;
        &::placeholder {
            color: rgba(0,0,0,.2);
        }
        &:focus {
            border-bottom: 2px solid ${theme.azulClaro}
        }
    }
 
    @media(max-width: 60rem){ /* 950px */
        justify-content: start;
    }
`;

const Input = styled.input`
    font-size: 2.5rem; /* 40px */
    text-transform: uppercase;
    border: none;
    border-bottom: 2px solid ${theme.negro};
    outline: none;
 
    @media(max-width: 60rem){ /* 950px */
        font-size: 2.2rem; /* 24px */
    }
`;
 
const InputGrande = styled(Input)`
    font-size: 4.37rem; /* 70px */
    font-weight: bold;
`;

const TextArea = styled.textarea`
    font-size: 2.5rem; /* 40px */
    text-transform: uppercase;
    border: none;
    border-bottom: 2px solid ${theme.negro};
    outline: none;
 
    @media(max-width: 60rem){ /* 950px */
        font-size: 2.2rem; /* 24px */
    }
`;


export {ContenedorBoton, Formulario, InputGrande, Input, TextArea};