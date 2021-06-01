import React from 'react';
import {ReactComponent as IconoCerrarSesion} from './../iconos/log-out.svg'
import {Boton} from './Boton';
import {auth} from './../firebase/firebaseConfig';
import {useHistory} from 'react-router-dom';

const BotonCerrarSesion = () => {
    const history = useHistory();

    const cerrarSesion = async () => {
        try {
            await auth.signOut();
            history.push("/inicio-sesion");
        } catch (e){
            console.log(e);
        }
    }

    return ( 
        <Boton conIcono as="button" onClick={cerrarSesion} primario>
            Cerrar Sesión <IconoCerrarSesion/>
        </Boton>
     );
}
 
export default BotonCerrarSesion;
