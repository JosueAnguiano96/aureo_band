import React from 'react';
import TituloDeSeccion from './../elementos/TituloDeSeccion';
import Productos from './Productos';
import {Container} from 'react-bootstrap'
import Carrito from './Carrito';

const Merch = (props) => {
    return (
        <Container style={{padding:"20px"}}>
            <TituloDeSeccion texto="Merch"></TituloDeSeccion>
            <Carrito />
            <Productos data={props.data}/>
        </Container>
     );
}
 
export default Merch;