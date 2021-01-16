import './Main.css';
import React, {useState} from 'react';
import Login from './Login/Login';
import Registro from './Registro/Registro';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';

/*Estilo para la grilla definido aca*/
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

export default function Main() {

    const classes = useStyles();
  
    return (
      <section className="seccion-principal">
        <Grid container justify="center" spacing={3}>
          <Registro />
          <Divider className="divisor" orientation="vertical" flexItem light={false} />
          <Login />          
        </Grid>
      </section>
    );
}