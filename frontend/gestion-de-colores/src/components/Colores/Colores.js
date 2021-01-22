import './Colores.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import TablaColores from '../Tablas/TablaColores';

export default function Colores() {
  return (
    <section className="seccion-colores">
      <Grid item>
        <TablaColores />        
      </Grid>
    </section>
  )
}