import { useState, useEffect } from 'react';
import {db} from './../firebase/firebaseConfig';
import {useHistory} from 'react-router-dom';

const useObtenerPedido = (id) => {
    const history = useHistory();
    const [pedido, setPedido] = useState('');

    useEffect( () => {
        db.collection('pedidosMerch').doc(id).get()
        .then((doc) => {
            if(doc.exists){
                setPedido(doc);
            } else {
                history.push('/lista');
            }
        })
    }, [history, id]);

    return [pedido];
}
 
export default useObtenerPedido;