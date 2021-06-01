import {db} from './firebaseConfig'

const insertarPedido = ({id, pedido,nombre, correo, telefono, detalle}) => {
    var today = new Date();
    var year = today.getFullYear();
    var mes = today.getMonth()+1;
    var dia = today.getDate();
    var fecha =dia+"-"+mes+"-"+year;

    return db.collection('pedidosMerch').add({
        idPedido: id,
        pedido: pedido,
        nombre: nombre,
        correo: correo,
        telefono: Number(telefono),
        detallePedido: detalle,
        estado: 'en proceso',
        fechaPedido: fecha
    })
}
 
export default insertarPedido;