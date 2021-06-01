import React, { useState, useContext } from 'react';
import {ContextoCarrito} from './../contextos/ContextoCarrito';
import {ReactComponent as IconoPedido} from './../iconos/pedido.svg'
import {Boton} from './../elementos/Boton'
import TerminarPedidoFormulario from './TerminarPedidoFormulario'

const Carrito = () => {

    const {carrito} = useContext(ContextoCarrito);

    const [mostrarPedido, setMostrarPedido] = useState(false);
    // const [articulosTotalesEnCarrito, setArticulosTotalesEnCarrito] = useState(0);

    

    const toggleMostrarPedido = () => {
        if(carrito.length === 0){
            setMostrarPedido(false)
        }else {
            setMostrarPedido(!mostrarPedido)
        }
    }
    
    return ( 
        <div>
            <div>
                {/* <span>Total de artículos: {articulosTotalesEnCarrito}</span> */}
            </div>
            <div>
                <Boton as="button" primario onClick={toggleMostrarPedido}><IconoPedido/>Ver carrito</Boton>
            </div>
            {mostrarPedido 
                ?
                    <div>
                        <TerminarPedidoFormulario setMostrarPedido={setMostrarPedido} mostrarPedido={mostrarPedido}/>
                    </div> 
                :
                ''
            }
        </div>
     );
}
 
export default Carrito;