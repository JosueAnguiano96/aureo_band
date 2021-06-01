import {db} from './firebaseConfig'

const editarPedido = ({id, nombre, correo, telefono, detalle, estado}) => {
return db.collection('pedidosMerch').doc(id).update({
        nombre: nombre,
        correo: correo,
        telefono: Number(telefono),
        detallePedido: detalle,
        estado: estado
    })

}

export default editarPedido;