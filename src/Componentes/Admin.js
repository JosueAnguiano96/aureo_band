import React, {useState} from 'react';
import BotonCerrarSesion from './../elementos/BotonCerrarSesion'
import {Container, Table} from 'react-bootstrap'
import styled from 'styled-components';
import useObtenerPedidos from './../hooks/useObtenerPedidos'
import borrarPedido from './../firebase/borrarPedido'
import {Boton} from './../elementos/Boton'
import {ContenedorBoton} from './../elementos/ElementosDeFormulario';
import editarPedido from '../firebase/editarPedido';
import {useHistory} from 'react-router-dom';
import Alerta from './../elementos/Alerta';
import {useAuth} from './../contextos/AuthContext';


const Admin = () => {

    const {usuario} = useAuth();

    const history = useHistory();

    const [merch] = useObtenerPedidos()

    //para la alerta
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const borrar = (id) => {
        if(window.confirm('¿Deseas eliminar el pedido? '+ id)){
            borrarPedido(id)
        }
    }

    const terminarPedido = (id, nombrePedido, correoPedido, telefonoPedido, detalle) => {
        if(window.confirm('¿Deseas cerrar el pedido?')){
            editarPedido({
                id: id, 
                nombre: nombrePedido, 
                correo: correoPedido, 
                telefono: telefonoPedido, 
                detalle: detalle, 
                estado: 'Entregado'
            }).then( () => {
                //se muestra mensaje de éxito
                cambiarEstadoAlerta(true)
                cambiarAlerta({tipo:'exito', mensaje: '¡Pedido cerrado en sistema!'})
    
                history.push('/adminaureo')
            }).catch( (e) => {
                //se muestra mensaje de éxito
                cambiarEstadoAlerta(true)
                cambiarAlerta({tipo:'error', mensaje: '¡error!'} + e)
            })
        }
    }

    return (
        <Container>
            <h1>Admin Áureo</h1>
            {
                usuario ? <BotonCerrarSesion /> : history.push('/inicio-sesion')
            }
            {
                merch.length > 0 ? 
                <ContenedorTabla>
                <Table bordered hover>
                <thead>
                <tr>
                <th>id del pedido</th>
                <th>Fecha del pedido</th>
                <th>Nombre cliente</th>
                <th>Correo cliente</th>
                <th>Telefono cliente</th>
                <th>Pedido del cliente</th>
                <th>Detalle del cliente</th>
                <th>Estado del pedido</th>
                <th>Acción</th>
                </tr>
                </thead>
                <tbody>
                {
                    merch.map((articulo, index) => {
                        return (
                            <tr key={index}>
                            <td>{articulo.id}</td>
                            <td>{articulo.fechaPedido}</td>
                            <td>{articulo.nombre}</td>
                            <td>{articulo.correo}</td>
                            <td>{articulo.telefono}</td>
                            <td>{articulo.pedido}</td>
                            <td>{articulo.detallePedido}</td>
                            <td>
                            {articulo.estado}
                            {articulo.estado !== 'Entregado' ? 
                            <ContenedorBoton>
                            <Boton as="button" verde onClick={ () => terminarPedido(articulo.id, articulo.nombre, articulo.correo, articulo.telefono, articulo.detallePedido)}>
                            Terminar pedido
                            </Boton>
                            </ContenedorBoton>
                            : 
                            ''
                        }
                        </td>
                        <td>
                        {/* <ContenedorBotones> */}
                        <Boton primario to={`/editarpedido/${articulo.id}`}>Editar</Boton>
                        <Boton azulClaro onClick={() => borrar(articulo.id)} style={{marginTop:"10px"}}>Borrar</Boton>
                        
                        {/* </ContenedorBotones> */}
                        </td>
                        </tr>
                        )
                    })
                }
                </tbody>
                </Table>
                </ContenedorTabla>
                : <h2 style={{color:"red",textAlign:"center",padding:"20px30px"}}>NO HAY PEDIDOS :(</h2>
                }
                <Alerta 
                tipo={alerta.tipo} 
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta} 
                />
                </Container>
     );
}
 
const ContenedorTabla = styled.div`
    max-width: 100%;
    margin: auto;
`;

export default Admin;