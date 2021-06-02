import { useState, useEffect } from 'react';
import {db} from './../firebase/firebaseConfig';

const useObtenerPedidos = () => {
    const [merch, setMerch] = useState([]);

    //esto es para que se ejecute sola 1 vez no cada vez que se cargue la pagina
    useEffect( () => {
        const unsuscribe = db.collection('pedidosMerch')
        // .where('idPedido', '!=', ' ')
        .orderBy('estado', 'desc')
        // .limit(10)
        .onSnapshot( (snapshot) => {
            // if(snapshot.docs.length > 0){
            //     setUltimoMerch(snapshot.docs[snapshot.docs.length -1]);
            //     setHayMasPorCargar(true);
            // } else {
            //     setHayMasPorCargar(false);
            // }

            setMerch(snapshot.docs.map( (articulo) => {
                const pedido = articulo.data().pedido.map( (producto) =>  " · " + producto.cantidad + " " + producto.tipoMerch + " $" + producto.precio )
                return {...articulo.data(), id: articulo.id, pedido: pedido}
            }))
        });

        //return para salir de la base de datos cuando desmontamos el componente
        return unsuscribe;
    }, []);



    return [merch];
    
}
 
export default useObtenerPedidos;