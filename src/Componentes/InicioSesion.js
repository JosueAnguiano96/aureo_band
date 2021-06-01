import React, {useState} from 'react';
import styled from 'styled-components';
import {ContenedorBoton, Formulario, Input} from './../elementos/ElementosDeFormulario';
import {Boton} from './../elementos/Boton';
import {ReactComponent as IconoEnviar} from './../iconos/enviar.svg'
import {useHistory} from 'react-router-dom';
import {auth} from './../firebase/firebaseConfig';
import Alerta from './../elementos/Alerta'
import {useAuth} from './../contextos/AuthContext';


const InicioSesion = () => {
    const {usuario} = useAuth();

    const history = useHistory()

    const [inputCorreo, changeInputCorreo] = useState('')
    const [inputPass, changeInputPass] = useState('')

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) => {
        if(e.target.name === 'correo'){
            changeInputCorreo(e.target.value);
        }else if(e.target.name === 'pass'){
            changeInputPass(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        cambiarEstadoAlerta(false);
        cambiarAlerta({});

        //comprobacion del lado del cliente que el correo sea valido
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!expresionRegular.test(inputCorreo)){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Por favor ingresa un correo electronico valido'
            })
            return;
        }

        if(inputCorreo === '' || inputPass === ''){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Por favor completa todos los campos para continuar'
            })
            return;
        }

        try {
            await auth.signInWithEmailAndPassword(inputCorreo, inputPass)
            history.push('/adminaureo');
        } catch (e){
            cambiarEstadoAlerta(true);

            let mensaje;
            switch(e.code){
                case 'auth/wrong-password':
                    mensaje = 'la contraseña es incorrecta'
                    break;
                case 'auth/user-not-found':
                    mensaje = 'Usuario no encontrado'
                    break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                    break;
            }
            cambiarAlerta({tipo: 'error', mensaje: mensaje})

        }

    }

    return (
        <Contenedor>
            <ContenedorHeader>
                <Titulo>Inicio de sesión</Titulo>
            </ContenedorHeader>
            <Formulario onSubmit={handleSubmit}>
            {
                usuario===null ? 
                <div>
                    <Input 
                        type="text"
                        name="correo"
                        id="correo"
                        placeholder="Correo"
                        value={inputCorreo}
                        onChange={handleChange}
                    />
                    <Input 
                        type="password"
                        name="pass"
                        id="pass"
                        placeholder="Contraseña"
                        value={inputPass}
                        onChange={handleChange}
                    />
                    <ContenedorBoton>
                        <Boton as="button" primario="true" conIcono="true" type="submit">
                            Enviar Mensaje <IconoEnviar />
                        </Boton>
                    </ContenedorBoton>
                </div>
             : <h1>Ya iniciaste sesión!!</h1>
            }
            </Formulario>
            <Alerta 
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </Contenedor>
     );
}

const Contenedor = styled.div`
    background: #fff;
    width: 90%;
    max-width: 70rem; /*1110px*/
    height: 70vh;
    max-height: 50rem;  /* 80px */
    overflow-y: auto;
    box-shadow: 0px 1.25rem 2.5rem rgba(0,0,0,.05);
    border-radius: 0.625rem; /* 10px */
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 100;
    margin-top: 20px;
 
    @media(max-width: 60rem){ /* 950px */
        height: 95vh;
        max-height: none;
    }
`;

const ContenedorHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
 
    @media(max-width: 60rem){ /* 950px */
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
 
        & > div {
            display: flex;
            margin-bottom: 1.25rem; /* 20px */
            justify-content: end;
        }
    }
`;

const Titulo = styled.h1`
    font-weight: normal;
    text-transform: uppercase;
    font-size: 2.5rem; /* 40px */
    padding: 30px 50px;
    
 
    @media(max-width: 60rem){ /* 950px */
        font-size: 2rem; /* 32px */
    }
`;


 
export default InicioSesion;