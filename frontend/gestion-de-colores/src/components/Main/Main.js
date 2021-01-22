import './Main.css';
import React from 'react';
import Login from './Login/Login';
import Registro from './Registro/Registro';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';

export default function Main() { 
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