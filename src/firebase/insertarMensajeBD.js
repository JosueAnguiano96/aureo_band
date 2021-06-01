import {db} from './firebaseConfig'

const insetarMensajeBD = ({nombre, correo, telefono, mensaje}) => {
    return db.collection('correosContacto').add({
        nombre: nombre,
        correo: correo,
        telefono: Number(telefono),
        mensaje: mensaje
    })
}

export default insetarMensajeBD;