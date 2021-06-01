import React, { useContext, useEffect, useState } from 'react';
import {Container} from 'react-bootstrap';
import styled from 'styled-components';
import {ContextoCarrito} from './../contextos/ContextoCarrito';
import {ReactComponent as Borrar} from './../iconos/borrar.svg'
import {Boton} from './../elementos/Boton'
import Modal from 'react-modal'
import {ContenedorBoton, Formulario, Input, TextArea} from './../elementos/ElementosDeFormulario';
import TituloDeSeccion from './../elementos/TituloDeSeccion';
import Alerta from './../elementos/Alerta';
import {ReactComponent as IconoEnviar} from './../iconos/enviar.svg'
import AureoLogo from './../imagenes/aureonegro.png'
import {v4 as uuidv4} from 'uuid';
import insertarPedido from './../firebase/insertarPedido'
import {useHistory} from 'react-router-dom'
import emailjs from 'emailjs-com';

const TerminarPedidoFormulario = ({setMostrarPedido}) => {

    const {carrito, quitarDelCarrito, vaciarCarrito} = useContext(ContextoCarrito);
    const history = useHistory();

    const [modalIsOpen,setIsOpen] = useState(false);
    const [inputNombre, changeInputNombre] = useState('');
    const [inputCorreo, changeInputCorreo] = useState('');
    const [inputMensaje, changeInputMensaje] = useState('');
    const [inputTelefono, changeInputTelefono] = useState('');

    //para la alerta
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});


    const [totalEnCarrito, setTotalEnCarrito] = useState(0)

    const borrar = (id, merch, precio) => {
        const pedidoCliente = {id: id, tipoMerch: merch, precio: precio}
        quitarDelCarrito(pedidoCliente)
    }

    //para el modal

    function openModal() {
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
        setMostrarPedido(false)
    }

    const handleChange = (e) => {
        if(e.target.name === 'nombre'){
            changeInputNombre(e.target.value);
        }else if(e.target.name === 'correo'){
            changeInputCorreo(e.target.value);
        }else if(e.target.name === 'mensaje'){
            changeInputMensaje(e.target.value);
        }else if(e.target.name === 'telefono'){
            changeInputTelefono(e.target.value.replace(/[^0-9.]/g,''));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(inputNombre !== '' && inputCorreo !== '' && inputTelefono !== '' && inputMensaje !== ''){
            insertarPedido({
                id: uuidv4(),
                pedido: carrito,
                nombre: inputNombre,
                correo: inputCorreo,
                telefono: inputTelefono,
                detalle: inputMensaje
            }).then( () => {
                //se muestra mensaje de éxito
                cambiarEstadoAlerta(true)
                cambiarAlerta({tipo:'exito', mensaje: '¡Gracias por tu pedido!, en breve nos ponemos en contacto contigo.'})
                
                //se reinician los valores
                changeInputNombre('')
                changeInputCorreo('')
                changeInputTelefono('')
                changeInputMensaje('')

                //se vacía el carrito
                vaciarCarrito()

                history.push('/merch')
                

            }).catch( (e) => {
                cambiarEstadoAlerta(true)
                cambiarAlerta({tipo: 'error', mensaje: 'Hubo un problema al intentar  enviar tu correo' + e})
            })

            emailjs.sendForm('service_pwpyzju', 'template_6vufnif', e.target, 'user_xO494hBMcuOOdebZrnAd3')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });


        }else {
            cambiarEstadoAlerta(true)
            cambiarAlerta({tipo:'error', mensaje: 'Completa todos los campos para continuar...'})

        }


    }

    
    useEffect( () =>  {
        const calculaTotalEnElCarrito = () => {
            let acumulado = 0;
            carrito.forEach( (productoDeCarrito, index) => {
                const totalPorArticulo = productoDeCarrito.cantidad * carrito[index].precio
                setTotalEnCarrito(acumulado = acumulado + totalPorArticulo)
            })
        }
        calculaTotalEnElCarrito()
    }, [carrito])

    return ( 
        <DivDeTerminarPedido>
            {/* <h3>Termina tu pedido...</h3> */}
            <DivDeLosProductosEnElCarrito>
                {
                    carrito.length>0 ?
                    carrito.map( (item, index) => {
                        return (
                            <DivDeLosProductos key={index}>
                                    <p>{item.cantidad}</p>
                                    <p>{item.tipoMerch}</p>
                                    <p>${item.precio}.00</p>
                                    <Borrar onClick={() => borrar(item.id, item.tipoMerch, item.precio)}/>
                                </DivDeLosProductos>
                            )
                        })
                        :
                        <p>No hay articulos en tu carrito...</p>
                    }
            </DivDeLosProductosEnElCarrito>
                    <Total>Total: ${totalEnCarrito}.00</Total>
                    <ContenedorBoton>
                        <Boton primario onClick={openModal}>Checkout</Boton>
                    </ContenedorBoton>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Pedido de áureo"
                ariaHideApp={false}
            >
                <LogoDeAureo src={AureoLogo} alt="Áureo"></LogoDeAureo>
                <Container style={{paddingBottom:"20px"}}>
                    <Formulario onSubmit={handleSubmit}>
                        <TituloDeSeccion texto="Ya casi..."/>
                        <p>Ingresa tus datos para completar tu pedido.</p>
                        <div>
                        {
                            carrito.length>0 ?
                            carrito.map( (item, index) => {
                                return (
                                    <div key={index}>
                                    <DivDeLosProductos >
                                            <p>Cantidad: {item.cantidad}</p>
                                            <p>Merch: {item.tipoMerch}</p>
                                            <p>Precio: ${item.precio}.00</p>
                                        </DivDeLosProductos> 
                                        </div>
                                    )
                                })
                                :
                                <p style={{color:"red"}}>No hay articulos en tu carrito, regresa a la página anterior y elige alguno...</p>
                        }
                        </div>
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
                        </div>
                        <ContenedorBoton>
                        <Boton as="button" primario="true" conIcono="true">
                            Enviar pedido <IconoEnviar />
                        </Boton>
                        </ContenedorBoton>


                    </Formulario>
                </Container>
            </Modal>
            <Alerta 
                tipo={alerta.tipo} 
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta} 
            />
        </DivDeTerminarPedido>
     );
}
 
const DivDeLosProductosEnElCarrito = styled.div`
    display: grid;
    grid-template-columns: repeat(1, minmax(auto, 1fr));
`;

const DivDeLosProductos = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(100px, 10rem));
    /* background-color: #e3e3e3; */
`;

const DivDeTerminarPedido = styled.div`
    background-color: #e3e3e3;
    padding: 30px 20px;
    max-width: 30rem;
    margin-top: 20px;
    box-shadow: 5px 5px 8px #999;

`;

const Total = styled.p`
    text-align: right;
    padding-top: 30px;
`;

const LogoDeAureo = styled.img`
    width: 100px;
    height: 30px;
    display: inline;
`;

export default TerminarPedidoFormulario;