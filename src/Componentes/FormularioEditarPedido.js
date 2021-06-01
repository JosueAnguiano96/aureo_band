import React, {useEffect, useState} from 'react';
import {Container}  from 'react-bootstrap'
import {Formulario, Input, TextArea, ContenedorBoton} from './../elementos/ElementosDeFormulario'
import {useHistory} from 'react-router-dom';
import {Boton} from './../elementos/Boton'
import {ReactComponent as IconoEnviar} from './../iconos/enviar.svg'
import editarPedido from './../firebase/editarPedido'
import Alerta from './../elementos/Alerta';


const FormularioEditarPedido = ({pedido}) => {

    const history = useHistory();

    const [inputNombre, changeInputNombre] = useState('');
    const [inputCorreo, changeInputCorreo] = useState('');
    const [inputMensaje, changeInputMensaje] = useState('');
    const [inputTelefono, changeInputTelefono] = useState('');
    const [inputFecha, changeInputFecha] = useState('');
    const [inputPedido, changeInputPedido] = useState('');
    const [inputEstatus, changeInputEstatus] = useState('');

    //para la alerta
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) => {
        if(e.target.name === 'nombre'){
            changeInputNombre(e.target.value);
        }else if(e.target.name === 'correo'){
            changeInputCorreo(e.target.value);
        }else if(e.target.name === 'mensaje'){
            changeInputMensaje(e.target.value);
        }else if(e.target.name === 'telefono'){
            changeInputTelefono(e.target.value.replace(/[^0-9.]/g,''));
        }else if(e.target.name === 'fechaPedido'){
            changeInputFecha(e.target.value);
        }else if(e.target.name === 'pedido'){
            changeInputPedido(e.target.value);
        }else if(e.target.name === 'estatus'){
            changeInputEstatus(e.target.value);
        }
    }

    useEffect(() => {
        //comprobamos si ya hay algun gasto
        //de ser asi establecemos todo el estate con los vlores del gasto
        if(pedido){
            changeInputNombre(pedido.data().nombre);
            changeInputCorreo(pedido.data().correo);
            changeInputMensaje(pedido.data().detallePedido);
            changeInputTelefono(pedido.data().telefono);
            changeInputFecha(pedido.data().fechaPedido);

            const pedidoCliente = pedido.data().pedido.map( (producto) => {
                return " · " + producto.cantidad + " " + producto.tipoMerch + " $" + producto.precio
            })

            changeInputPedido(pedidoCliente)
            changeInputEstatus(pedido.data().estado);

        }
    }, [pedido]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(inputNombre !== '' && inputCorreo !== '' && inputTelefono !== '' && inputMensaje !== ''){
            editarPedido({
                id: pedido.id,                
                nombre: inputNombre,
                correo: inputCorreo,
                telefono: inputTelefono,
                detalle: inputMensaje,
                estado: inputEstatus
            }).then( () => {
                //se muestra mensaje de éxito
                cambiarEstadoAlerta(true)
                cambiarAlerta({tipo:'exito', mensaje: '¡Gracias por tu pedido!, en breve nos ponemos en contacto contigo.'})

                history.push('/adminaureo')
            })
        }

    }

    return ( 
        <Container>
            <Formulario id="pedidosEditar" onSubmit={handleSubmit}>
                <div>
                    <Input 
                        type="text"
                        name="nombre"
                        id="nombre"
                        placeholder="Nombre"
                        value={inputNombre}
                        onChange={handleChange}
                    />
                    <Input 
                        type="mail"
                        name="correo"
                        id="correo"
                        placeholder="Correo"
                        value={inputCorreo}
                        onChange={handleChange}
                    />
                    <Input 
                        type="text"
                        name="telefono"
                        id="telefono"
                        placeholder="Telefono"
                        value={inputTelefono}
                        onChange={handleChange}
                    />
                    <TextArea 
                        name="mensaje"
                        id="mensaje"
                        placeholder="Detalles del pedido. Ej. Color, talla, etc."
                        value={inputMensaje}
                        onChange={handleChange}
                    />
                    <Input 
                        type="text"
                        name="fechaPedido"
                        id="fechaPedido"
                        placeholder="Fecha del pedido"
                        value={inputFecha}
                        onChange={handleChange}
                        disabled="true"
                    />
                    <TextArea 
                        name="pedido"
                        id="pedido"
                        placeholder="Pedido"
                        value={inputPedido}
                        onChange={handleChange}
                        disabled="true"
                    />
                    <Input 
                        type="text"
                        name="estatus"
                        id="estatus"
                        placeholder="Estado del pedido"
                        value={inputEstatus}
                        onChange={handleChange}
                        disabled="true"
                    />
                </div>
                <ContenedorBoton>
                    <Boton as="button" primario="true" conIcono="true">
                        Guardar cambios <IconoEnviar />
                    </Boton>
                </ContenedorBoton>
            </Formulario>
            <Alerta 
                tipo={alerta.tipo} 
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta} 
            />
        </Container>
     );
}
 
export default FormularioEditarPedido;