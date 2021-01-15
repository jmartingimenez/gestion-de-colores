import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AxiosService from './../../../utils/AxiosService';

export default function Login(){
    const [inputUsernameLogin, setInputUsernameLogin] = useState("");
    const [inputPasswordLogin, setInputPasswordLogin] = useState("");

    const HandleLogin = (e) => {
        e.preventDefault();        
       
        AxiosService.LoginUser(inputUsernameLogin, inputPasswordLogin)
        .then(login => {
            if(login.esValido){
                console.log("Login valido: ", login.mensaje);
                /*TO DO
                - Componente con Logout
                - Redireccionar otra página
                */
            }else{
                console.log("Login invalido: ", login.mensaje);
                /*TO DO
                - Mensaje de error
                */
            }
        });
    }

    return (
        <Grid className="grid-login" item xs={5}>
            <div className="seccion-principal-titulo">
                Acceder
            </div>
            <div className="contenedor-formulario-login">
                <form autoComplete="off">
                    <Grid item xs={12}>
                        <TextField 
                            id = "input-login-usuario" 
                            label = "Usuario"
                            type = "text"
                            onInput = {e => setInputUsernameLogin(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="input-login-password"
                            label="Contraseña"
                            type="password"
                            onInput={e => setInputPasswordLogin(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <Button id="btn-login" type="submit" onClick={(e) => HandleLogin(e)}>
                            Enviar    
                        </Button> 
                    </Grid>
                </form>
            </div>
      </Grid>
      );    
}