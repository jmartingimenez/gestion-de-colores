import './Colores.css';
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TablaColores from '../Tablas/TablaColores';

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
        <TablaColores />        
      </Grid>
    </section>
  )
}