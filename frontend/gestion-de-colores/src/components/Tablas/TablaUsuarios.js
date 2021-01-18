import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import AxiosService from '../../utils/AxiosService';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Tabla from './Tabla';

export default class TablaUsuarios extends Tabla{
  constructor(props){
    super(props);
    this.state = { data: [] };
  }

  componentDidMount(){
    AxiosService.GetUsersData()
    .then(res => {
      if(res.esValido){
        const usuarios = res.mensaje;
        this.setState({data: usuarios});
      }
    });
  }

  render(){
    const themeProps = this.GetTheme();
    const tableProps = {
      title: 'Usuarios con acceso al sistema',
      options: this.GetOptions('Lista de usuarios', 'Usuarios'),
      theme: this.GetTheme(),
      columns: [
        {
          name: "id",
          label: "Id",
          options: {
            filter: false,
            sort: true,
          }
        },
        {label: "Username", name: "username"},
        {label: "Nombre", name: "nombre"},
        {label: "Apellido", name: "apellido"},
        {label: "Edad", name: "edad"}
      ]
    };
    return this.GetTable(themeProps, tableProps);
  }
}