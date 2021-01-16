import React, {useContext, useState, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AxiosService from './../../../utils/AxiosService';
import AuthContext from '../../../auth-context';
import Mensaje from '../../Mensaje/Mensaje';

export default function Login(){
    const [inputUsernameLogin, setInputUsernameLogin] = useState("");
    const [inputPasswordLogin, setInputPasswordLogin] = useState("");
    const usuarioContext = useContext(AuthContext);
    const mensajeRef = useRef()
    const history = useHistory();

    const HandleLogin = (e) => {
        e.preventDefault();        
        
        //Limpio cualquier mensaje relacionado al login
        mensajeRef.current.removeMensaje();

        //Se consulta a la API para lograr la autenticación
        AxiosService.LoginUser(inputUsernameLogin, inputPasswordLogin)
        .then(login => {
            if(login.esValido){
                usuarioContext.setLoggedIn(true);
                localStorage.setItem('userKey', true);
                history.push('/colores');
                /*TO DO
                - Redireccionar otra página
                */
            }else{
                //Seteo de mensaje de error
                mensajeRef.current.updateMensaje(login.mensaje, login.esValido);
            }            
        });
    }

    return (
        <Grid className="grid-login" item xs={5}>
            <div className="seccion-principal-titulo">
                ¿Ya tenés un usuario?
            </div>
            <div className="contenedor-formulario-login">
                <form id="form-login" autoComplete="off" onSubmit={(e => HandleLogin(e))}>
                    <Grid item xs={12}>
                        <TextField 
                            id = "input-login-usuario" 
                            label = "Usuario"
                            type = "text"
                            style = {{width: '50%'}}
                            onInput = {e => setInputUsernameLogin(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="input-login-password"
                            label="Contraseña"
                            type="password"
                            style = {{width: '50%'}}
                            onInput={e => setInputPasswordLogin(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12} style={{paddingTop: 35}}>
                        <Button 
                            variant="contained"
                            color="primary" 
                            type="submit" 
                            >
                            Acceder    
                        </Button> 
                    </Grid>
                    <Grid item xs={12}>
                        <Mensaje className="mensaje-login" ref={mensajeRef} />
                    </Grid>
                </form>
            </div>
      </Grid>
      );    
}