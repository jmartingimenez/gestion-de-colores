import React, {useState, useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AxiosService from './../../../utils/AxiosService';
import Mensaje from '../../Mensaje/Mensaje';

export default function Registro(){
    const [inputUsernameRegistro, setInputUsernameRegistro] = useState("");
    const [inputPasswordRegistro, setInputPasswordRegistro] = useState("");
    const [inputNombreRegistro, setInputNombreRegistro] = useState("");
    const [inputApellidoRegistro, setInputApellidoRegistro] = useState("");
    const [inputEdadRegistro, setInputEdadRegistro] = useState("");
    const mensajeRef = useRef()

    const HandleRegistro = (e) => {
        e.preventDefault();

        //Limpio cualquier mensaje relacionado al login
        mensajeRef.current.removeMensaje();

        //Se intenta agregar el usuario a la base de datos
        AxiosService.AddUser(  inputUsernameRegistro, 
                               inputPasswordRegistro, 
                               inputNombreRegistro, 
                               inputApellidoRegistro, 
                               inputEdadRegistro)
        .then(registro => {
            if(registro.esValido){
                document.getElementById("form-registro").reset();
            }
            mensajeRef.current.updateMensaje(registro.mensaje, registro.esValido);
        });
    }

    return (
        <Grid className="grid-registro" item xs={5}>
            <div className="seccion-principal-titulo">
                Registrate
            </div>
            <div className="contenedor-formulario-registro">
                <form id="form-registro" autoComplete="off" onSubmit={(e => HandleRegistro(e))}>
                    <Grid item xs={12}>
                        <TextField 
                            id = "input-registro-usuario" 
                            label = "Usuario"
                            type = "text"
                            style = {{width: '50%'}}
                            onInput = {e => setInputUsernameRegistro(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="input-registro-password"
                            label="Contraseña"
                            type="password"
                            style = {{width: '50%'}}
                            onInput={e => setInputPasswordRegistro(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="input-registro-nombre"
                            label="Nombre"
                            type="text"
                            style = {{width: '50%'}}
                            onInput={e => setInputNombreRegistro(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="input-registro-apellido"
                            label="Apellido"
                            type="text"
                            style = {{width: '50%'}}
                            onInput={e => setInputApellidoRegistro(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="input-registro-edad"
                            label="Edad"
                            type="text"
                            style = {{width: '50%'}}
                            onInput={e => setInputEdadRegistro(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12} style={{paddingTop: 35}}>
                        <Button 
                            variant="contained"
                            color="primary" 
                            type="submit" 
                            >
                            Crear usuario    
                        </Button> 
                    </Grid>
                    <Grid item xs={12}>
                        <Mensaje className="mensaje-registro" ref={mensajeRef} />
                    </Grid>
                </form>
            </div>
      </Grid>
      );    
}