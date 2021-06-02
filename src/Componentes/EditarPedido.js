import React from 'react';
import {useParams} from 'react-router-dom';
import FormularioEditarPedido from './../Componentes/FormularioEditarPedido'
import useObtenerPedido from './../hooks/useObtenerPedido'
import TituloDeSeccion from './../elementos/TituloDeSeccion'


const EditarPedido = () => {
    const {id} = useParams();

    const[pedido] = useObtenerPedido(id);

    
    return ( 
        <>
            {/* <h3>Aqui se edita el pedido.{id}</h3> */}
            <TituloDeSeccion texto="EDITAR PEDIDO"></TituloDeSeccion>
            <FormularioEditarPedido pedido={pedido} />
        </>
     );
}
 
export default EditarPedido;