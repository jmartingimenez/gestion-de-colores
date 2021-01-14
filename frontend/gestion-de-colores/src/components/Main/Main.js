import './Main.css';
import AxiosService from './../../utils/AxiosService';
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

/*Estilo para la grilla definido aca*/
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

export default function Main() {
    //Hooks para Login
    const [inputUsernameLogin, setInputUsernameLogin] = useState("");
    const [inputPasswordLogin, setInputPasswordLogin] = useState("");

    //Funciones
    const HandleLogin = (e) => {
        e.preventDefault();        
       
        AxiosService.LoginUser(inputUsernameLogin, inputPasswordLogin)
        .then(login => {
            if(login.esValido){
                console.log("Login valido: ", login.mensaje);
                /*TO DO
                - Componente con Logout
                - Redireccionar otra página
                - Ordenar este archivo y dividirlo en componentes mas chicos
                */
            }else{
                console.log("Login invalido: ", login.mensaje);
                /*TO DO
                - Mensaje de error
                */
            }
        });
    }

    const classes = useStyles();
  
    return (
      <section className="seccion-principal">
        <Grid container justify="center" spacing={3}>

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

          <Divider className="divisor" orientation="vertical" flexItem light={false} />

          <Grid className="grid-registro" item xs={5}>
            <div className="seccion-principal-titulo">
              Registrarse
            </div>
            <div className="contenedor-formulario-registro">
                Registro aca
            </div>
          </Grid>
          
        </Grid>
      </section>
    );
  }