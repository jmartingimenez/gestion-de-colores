import React from 'react';
import AxiosService from '../../utils/AxiosService';
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tabla from './Tabla';

export default class TablaColores extends Tabla{
  constructor(props){
    super(props);
    this.state = { data: [] };
  }

  componentDidMount(){
    AxiosService.GetColorsData()
    .then(res => {
      if(res.esValido){
        const colores = res.mensaje;
        this.setState({data: colores});
      }
    });
  }

  render(){
    const customToolbar = () =>{
      return (
        <Tooltip title="Agregar">
        <IconButton 
          aria-label="Add" 
          component="button" 
          style={{"padding": 0}}
          onClick = {() => {
            alert("Agregar color");        
          }}>
            <AddIcon />
          </IconButton>
      </Tooltip> 
      );
    };

    const themeProps = this.GetTheme();
    const tableProps = {
      title: 'Colores guardados en el sistema',
      options: this.GetOptions('Lista de colores', 'Colores', customToolbar),
      theme: this.GetTheme(),
      columns: [
        {
          name: "Id",
          label: "Id",
          options: {
            filter: false,
            sort: true,
          }
        },
        {label: "Nombre", name: "Nombre"},
        {label: "Creación", name: "Creacion"},
        {
          label: "",
          name: "",
          options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta, updateValue) => {
              var id = tableMeta.rowData[0];
              return (
                <>
                  <Tooltip title="Editar">
                    <IconButton 
                      aria-label="Edit" 
                      component="button" 
                      style={{"padding": 0}}
                      onClick = {() => {
                        alert("Edit para color de id: " + id);
                      }}>
                        <EditIcon />
                      </IconButton>
                  </Tooltip> 

                  <Tooltip title="Eliminar">
                    <IconButton 
                      aria-label="Delete" 
                      component="button" 
                      style={{"padding": 0}}
                      onClick = {() => {
                        AxiosService.RemoveColor(id)
                        .then(res => {
                          const { data } = this.state;
                          data.splice(tableMeta.rowIndex, 1);
                          this.setState({ data });
                        });
                      }}>
                        <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>                 
                </>
              );              
            }
          }
        }
      ]
    };

    return this.GetTable(themeProps, tableProps);
  }
}