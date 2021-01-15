import React, {useContext, useEffect} from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";
import AxiosService from "../../utils/AxiosService";
import AuthContext from './../../auth-context.js';
import './Header.css';

export default function Header() {
  const usuarioContext = useContext(AuthContext);

  const HandleGetUserData = () => {
    alert("Get user data");
  };

  const HandleLogout = () => {
    AxiosService.LogoutUser()
    .then(res => {
      usuarioContext.setLoggedIn(false);
      localStorage.removeItem('userKey');
    });
  };

  //Logo. Se toma el tamaño del H6, pero el componente es un H1 por tema de accesibilidad
  //Ver: https://medium.com/better-programming/building-a-basic-header-with-materialui-and-react-js-d650f75b4b0a
  const logoAplicacion = (
    <Typography variant="h6" component="h1">
      Gestor de colores
    </Typography>
  );

  const menuDerecho = (
    <>
      <Button onClick = {e => HandleGetUserData()} color="inherit">Mis datos</Button>
      <Button onClick = {e => HandleLogout()} color="inherit">Logout</Button>
    </>
  );

  const header = () => {
    return (
      <Toolbar className="header">
        <Grid container justify="space-between">

          <Grid item>
            {logoAplicacion}
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