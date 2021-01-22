import './Usuarios.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import TablaUsuarios from '../Tablas/TablaUsuarios';

export default function Usuarios() {  
  return (
    <section className="seccion-usuarios">
      <Grid item>
      <TablaUsuarios />      
      </Grid>
    </section>
  )
}