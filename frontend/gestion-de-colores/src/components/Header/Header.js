import React, {useContext} from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";
import { useHistory, Link } from 'react-router-dom';
import AxiosService from "../../utils/AxiosService";
import AuthContext from './../../auth-context.js';
import SweetAlertService from './../../utils/SweetAlertService';
import './Header.css';

export default function Header() {
  const usuarioContext = useContext(AuthContext);
  const history = useHistory();

  const HandleGetMyData = () => {
    AxiosService.GetMyData()
    .then(res => {
      let data = res.mensaje;
      let id = data.Id;
      let username = data.Username;
      let nombre = data.Nombre;
      let apellido = data.Apellido;
      let edad = data.Edad;

      SweetAlertService.MisDatos(
        'info', 
        nombre + ' ' + apellido + ' (' + username + ')', 
        'Tu id: ' + id + '. Tu edad: ' + edad + '.', 
        'La seccion "Usuarios" permite ver datos de todos.');
    });
  };

  const HandleRedirectUsuarios = () => {
    history.push('/usuarios');
  };

  const HandleRedirectColores = () => {
    history.push('/colores');
  };

  const HandleLogout = () => {
    AxiosService.LogoutUser()
    .then(res => {
      usuarioContext.setLoggedIn(false);
      localStorage.removeItem('userKey');
      history.push('/');
    });
  };

  //Logo. Se toma el tamaño del H6, pero el componente es un H1 por tema de accesibilidad
  //Ver: https://medium.com/better-programming/building-a-basic-header-with-materialui-and-react-js-d650f75b4b0a
  const logoAplicacion = (
    <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
      <Typography variant="h6" component="h1">
        Gestor de colores
      </Typography>
    </Link>

  );

  const menuIzquierdo = (
    <>
      <Button onClick = {e => HandleRedirectUsuarios()} color="inherit">Usuarios</Button>
      <Button onClick = {e => HandleRedirectColores()} color="inherit">Colores</Button>
    </>
  );

  const menuDerecho = (
    <>
      <Button onClick = {e => HandleGetMyData()} color="inherit">Mis datos</Button>
      <Button onClick = {e => HandleLogout()} color="inherit">Logout</Button>
    </>
  );

  const header = () => {
    return (
      <Toolbar className="header">
        <Grid container justify="space-between">

          <Grid item>
            <Grid container item xs={12}>
              <Grid item>{logoAplicacion}</Grid>
              <Grid item>{usuarioContext.loggedIn === true ? <>{menuIzquierdo}</> : ''}</Grid>
            </Grid>
          </Grid>

          <Grid item>
            {usuarioContext.loggedIn === true ? <>{menuDerecho}</> : ''}
          </Grid>

        </Grid>  
      </Toolbar>
    );
  }
    
  return (
    <header>
      <AppBar>{header()}</AppBar>
    </header>
  );
}