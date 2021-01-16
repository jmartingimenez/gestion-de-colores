import React, {useState, useImperativeHandle} from 'react';
import './Mensaje.css';

const Mensaje = React.forwardRef((props, ref) => {
    const [mensaje, setMensaje] = useState("Dejar vacío");
    const [claseMensaje, setClaseMensaje] = useState("mensaje-api");

    const updateMensaje = (nuevoMensaje, esExitoso) => { 
        setMensaje(nuevoMensaje); 
        setClaseMensaje("mensaje-api " + (esExitoso ? "mensaje-success" : "mensaje-error"));
    }

    const removeMensaje = () => {
        setMensaje('');
        setClaseMensaje('mensaje-api');
    }
  
    useImperativeHandle(ref, () => ({
      updateMensaje,
      removeMensaje
    }));

    return(
        <div className={claseMensaje}>
            {mensaje}
        </div>
    );
}); 

export default Mensaje;