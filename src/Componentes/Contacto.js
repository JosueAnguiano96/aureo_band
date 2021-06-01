import React, {useState} from 'react';
import {Container} from 'react-bootstrap';
import {ContenedorBoton, Formulario, Input, TextArea} from './../elementos/ElementosDeFormulario';
import TituloDeSeccion from './../elementos/TituloDeSeccion';
import {Boton} from './../elementos/Boton';
import {ReactComponent as IconoEnviar} from './../iconos/enviar.svg'
import emailjs from 'emailjs-com';
import insetarMensajeBD from './../firebase/insertarMensajeBD';
import Alerta from './../elementos/Alerta';



const Contacto = () => {
    const [inputNombre, changeInputNombre] = useState('');
    const [inputCorreo, changeInputCorreo] = useState('');
    const [inputMensaje, changeInputMensaje] = useState('');
    const [inputTelefono, changeInputTelefono] = useState('');

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
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(inputNombre !== '' && inputCorreo !== '' && inputTelefono !== '' && inputMensaje !== ''){
            insetarMensajeBD({
                nombre: inputNombre, 
                correo: inputCorreo,
                telefono: inputTelefono,
                mensaje: inputMensaje
            }).then( () => {
                changeInputNombre('')
                changeInputCorreo('')
                changeInputTelefono('')
                changeInputMensaje('')
    
                cambiarEstadoAlerta(true)
                cambiarAlerta({tipo:'exito', mensaje: '¡Gracias, correo enviado con éxito!, en breve nos ponemos en contacto contigo.'})
            }).catch( (e) => {
                cambiarEstadoAlerta(true)
                cambiarAlerta({tipo: 'error', mensaje: 'Hubo un problema al intentar  enviar tu correo' + e})
            })

            emailjs.sendForm('service_pwpyzju', 'template_bxhvbl8', e.target, 'user_xO494hBMcuOOdebZrnAd3')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        }else{
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje: 'Por favor rellena todos los campos.'})
        }

        
    }

    return (
        <Container style={{paddingBottom:"20px"}}>
            <Formulario onSubmit={handleSubmit}>
                <TituloDeSeccion texto="Contáctanos"/>
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
                        placeholder="Mensaje"
                        value={inputMensaje}
                        onChange={handleChange}
                    />
                </div>
                <ContenedorBoton>
                <Boton as="button" primario="true" conIcono="true">
                    Enviar Mensaje <IconoEnviar />
                </Boton>
            </ContenedorBoton>

            <Alerta 
                tipo={alerta.tipo} 
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta} 
            />

            </Formulario>
        </Container>
    );
}
 
export default Contacto;