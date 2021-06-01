import React, {useContext} from 'react';
import styled from 'styled-components';
import {ContextoCarrito} from './../contextos/ContextoCarrito';
import {Col, Row} from 'react-bootstrap'
import {Boton} from './../elementos/Boton'
import {ReactComponent as IconoMas} from './../iconos/mas.svg'


const Productos = ({data}) => {

    const {agregarAlCarrito} = useContext(ContextoCarrito);

    const addToCart = (id, merch, precio) => {
        const pedidoCliente = {id: id, tipoMerch: merch, precio: precio}

        agregarAlCarrito(pedidoCliente);

    }

    return ( 
        <Row>
            {data ? data.map ( (item, id) => {
                return (
                        <Col lg={6} key={id}>
                            <DivDeProducto>
                                    <ImagenProducto src={item.imagen} alt={item.tipoMerch} />
                                <ContenedorInfoProducto>
                                    <p>{item.tipoMerch}</p>
                                    <p>Precio: ${item.precio}.00</p>
                                    <Boton 
                                        primario="true"
                                        conIcono="true" 
                                        onClick={ 
                                            () => addToCart(item.id, item.tipoMerch, item.precio)
                                        }
                                    >
                                        Agregar al carrito <IconoMas />
                                    </Boton>
                                </ContenedorInfoProducto>
                            </DivDeProducto>
                        </Col>
                )
            }) : 'Cargando merch...'}
        </Row>
     );
}

const DivDeProducto = styled.div`
    width: 100%;
    height: auto;
    text-align: center;
    display: block;
    margin-top: 20px;
    /* background-color: red; */
    `;

 const ImagenProducto = styled.img`
    max-width: 12rem;
 `;

const ContenedorInfoProducto = styled.div`
    max-width: 100%;
    text-align: center;
    font-size: 20px;
`;

 
export default Productos;