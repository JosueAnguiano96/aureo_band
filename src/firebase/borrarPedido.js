import {db} from './firebaseConfig';

const borrarPedido = (id) => {
    db.collection('pedidosMerch').doc(id).delete();
}

export default borrarPedido;