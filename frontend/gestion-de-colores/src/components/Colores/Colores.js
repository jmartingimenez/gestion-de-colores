import './Colores.css';
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import TablaUsuarios from '../Tablas/TablaUsuarios';

/*Estilo para la grilla definido aca*/
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

export default function Colores() {
  const classes = useStyles();
  
  return (
    <section className="seccion-colores">
      <Grid item>
        <div>
          Hola mundo!
          <TablaUsuarios />
        </div>        
      </Grid>
    </section>
  )
}