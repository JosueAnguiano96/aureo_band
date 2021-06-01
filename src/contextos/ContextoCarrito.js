import React, { useState } from 'react';

const ContextoCarrito = React.createContext();

const CarritoProvider = ({children}) => {
    const [carrito, setCarrito] = useState([]);
    // const [totalEnCarrito, setTotalEnCarrito] = useState(0);

    const agregarAlCarrito = (pedidoCliente) => {
        if(carrito.length === 0){
            //si el carrito está vacío, se agrega el elemento directo
            setCarrito([...carrito, {id: pedidoCliente.id, cantidad: 1,tipoMerch: pedidoCliente.tipoMerch, precio: pedidoCliente.precio}])
        }else{
            //De otra forma tenemos que revisar qu eel carrito ya tenga el rpoducto que queremos agregar
            // Si ya lo tiene entonces vamos a actualizar su valor
            //Si no tiene el producto lo agregamos

            //para poder editar el arreglo tenemos que clonarlo
            const nuevoCarrito = [...carrito];

            //si el carrito ya tiene el id del producto que queremos agregar (true / false)
            const yaEstaEnCarrito = nuevoCarrito.filter( (productoDeCarrito) => {
                return productoDeCarrito.id === pedidoCliente.id
            }).length > 0;

            //si ya tiene el producto entonces lo tenemos que actualizar
            if(yaEstaEnCarrito){
                //Para ello tenemos que buscarlo y obtener su posicion en el arreglo
                //Y en base a esa posición ya actualizamos el valor
                nuevoCarrito.forEach( (productoDeCarrito, index) => { 
                    if (productoDeCarrito.id === pedidoCliente.id){
                        const cantidad = nuevoCarrito[index].cantidad;
                        nuevoCarrito[index] = {id: pedidoCliente.id, cantidad: cantidad+1, tipoMerch: pedidoCliente.tipoMerch, 
                            precio: pedidoCliente.precio}
                        setCarrito(nuevoCarrito)
                    }
                })
            } else { // de otra forma, agregamos el producto al arreglo
                nuevoCarrito.push(
                        {
                            id: pedidoCliente.id, 
                            cantidad: 1,
                            tipoMerch: pedidoCliente.tipoMerch, 
                            precio: pedidoCliente.precio
                        }
                )

                setCarrito(nuevoCarrito)
                
            }
            return {
                ...carrito,
                carrito: nuevoCarrito
            }
        }
    }

    const quitarDelCarrito = (pedidoCliente) => {
        //para poder editar el arreglo tenemos que clonarlo
        const nuevoCarrito = [...carrito];

        nuevoCarrito.forEach( (productoDeCarrito, index) => { 
            if (productoDeCarrito.id === pedidoCliente.id){
                const cantidad = nuevoCarrito[index].cantidad;
                //checamos si sólo queda un elemento para que no haya productos en el carrito como 0 o negativos
                if(cantidad === 1){
                    const arregloSinElProductoAQuitar = nuevoCarrito.filter(elemento => elemento.id !== productoDeCarrito.id)
                    setCarrito(nuevoCarrito[index] = arregloSinElProductoAQuitar)
                }else { //sino, le quitamos en 1 a la cantidad del ya existente
                    nuevoCarrito[index] = {id: pedidoCliente.id, cantidad: cantidad-1, tipoMerch: pedidoCliente.tipoMerch, 
                        precio: pedidoCliente.precio}
                    setCarrito(nuevoCarrito)
                }
            }
        })
    }

    const vaciarCarrito = () => {
        setCarrito([])
    }
 
    return (
        <ContextoCarrito.Provider value={{carrito, agregarAlCarrito, quitarDelCarrito, vaciarCarrito}}>
            {children}
        </ContextoCarrito.Provider>
    )
}

export {ContextoCarrito, CarritoProvider}