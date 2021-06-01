import React from 'react';
import styled from 'styled-components';

const TituloDeSeccion = (props) => {
    return (
        <TituloGrande>{props.texto}</TituloGrande>
    );
}

const TituloGrande = styled.h1`
    display: block;
    width: 100%;
    padding: 25px 25px;
    font-size: 3rem;
    margin-top: 50px;
`;
 
export default TituloDeSeccion;