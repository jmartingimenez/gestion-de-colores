import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AxiosService from './../../../utils/AxiosService';

export default function Registro(){
    const [inputUsernameRegistro, setInputUsernameRegistro] = useState("");
    const [inputPasswordRegistro, setInputPasswordRegistro] = useState("");
    const [inputNombreRegistro, setInputNombreRegistro] = useState("");
    const [inputApellidoRegistro, setInputApellidoRegistro] = useState("");
    const [inputEdadRegistro, setInputEdadRegistro] = useState("");

    const HandleRegistro = (e) => {
        e.preventDefault();        
       
        AxiosService.RegistroUser(  inputUsernameRegistro, 
                                    inputPasswordRegistro, 
                                    inputNombreRegistro, 
                                    inputApellidoRegistro, 
                                    inputEdadRegistro)
        .then(registro => {
            if(registro.esValido){
                //                
            }else{
                //
            }
        });
    }

    return (
        <Grid className="grid-registro" item xs={5}>
            <div className="seccion-principal-titulo">
                Registrarse
            </div>
            <div className="contenedor-formulario-registro">
                Registro aca
            </div>
      </Grid>
      );    
}