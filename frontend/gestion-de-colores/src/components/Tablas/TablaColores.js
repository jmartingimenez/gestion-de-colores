import React from 'react';
import AxiosService from '../../utils/AxiosService';
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Tabla from './Tabla';
import AddColorFormModal from '../Colores/Form/AddColorFormModal';
import EditColorFormModal from '../Colores/Form/EditColorFormModal';

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

  HandleAddNewColor = (id, nombre, creacion) => {
    const { data } = this.state;
    data.push({Id: id, Nombre: nombre, Creacion: creacion});
    data.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
    this.setState({ data });
  }

  HandleUpdateColor = (id, nombre) => {
    const { data } = this.state;
    data.find(v => v.Id === id).Nombre = nombre.toUpperCase();
    data.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
    this.setState({ data });    
  }

  render(){
    const customToolbar = () =>{      
      return (
        <AddColorFormModal data={this.state} add={this.HandleAddNewColor} />
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
              var nombre = tableMeta.rowData[1];

              return (
                <>
                  <EditColorFormModal 
                    data={{idEdit: id, nombreEdit: nombre}} 
                    update={this.HandleUpdateColor}
                  />

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