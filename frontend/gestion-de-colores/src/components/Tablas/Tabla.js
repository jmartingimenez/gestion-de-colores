/*IMPORTANTE: SOBRE EL WARNING DE 'findDOMNode is deprecated'
- Parece ser un tema de material ui con respecto a los poppover sobre los iconos.
- Depende que lo fixeen ellos o quitar el StrictMode
- Ver issue en https://github.com/gregnb/mui-datatables/issues/1543 
*/
import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { saveAs } from 'file-saver';
import { write, utils } from 'xlsx';
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider } from '@material-ui/core/styles';

export default class Tabla extends React.Component{
    constructor(props){
        super(props);
    }

    GetOptions(nombreDeArchivoExcel, nombreDeHojaExcel, customToolbar){
        return {
            filterType: 'textField',
            selectableRows: false,
            customToolbar: customToolbar,
            onDownload: (buildHead, buildBody, columns, values) => {
              const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
              const fileExtension = '.xlsx';

              var dataArray = [];
              for (let indexRow = 0; indexRow < values.length; indexRow++) {
                var jsonElement = {};
          
                const rowData = values[indexRow].data;
                for (let indexColumn = 0; indexColumn < columns.length; indexColumn++) {
                  const columnName = columns[indexColumn].label;   
                  jsonElement[columnName] = rowData[indexColumn];  
                }
          
                dataArray.push(jsonElement);
              }

              const ws = utils.json_to_sheet(dataArray);
              const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
              const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array'});
              const data = new Blob([excelBuffer], { type: fileType });
              saveAs(data, nombreDeArchivoExcel + fileExtension);
          
              // cancel default  CSV download from table
              return false;
            },
            textLabels: {
              pagination: {
                next: "Siguiente",
                previous: "Anterior",
                rowsPerPage: "Resultados por página:",
                displayRows: "de" // 1-10 de 30
              },
              toolbar: {
                search: "Buscar",
                downloadCsv: "Exportar Excel",
                print: "Imprimir",
                viewColumns: "Ver columnas",
                filterTable: "Filtrar"
              },
              filter: {
                title: "FILTROS",
                reset: "reestablecer",          
              },
              viewColumns: {
                title: "Ver columnas"
              },
              selectedRows: {
                text: "fila(s) seleccionada(s)",
                delete: "Eliminar"
              }
            }            
        };
    }

    GetTheme(){
        return createMuiTheme({
            overrides: {
              MUIDataTable: {
                root: {
                },
                paper: {
                  boxShadow: "none",
                }
              },
              MUIDataTableHeadCell: {
                root:{
                },
                toolButton: {
                  justifyContent: 'center'
                }, 
                fixedHeader: {
                  borderBottom: '2px solid black',
                },
                data: {
                  fontWeight: 'bold',
                  textAlign: 'center'
                }
              },
              MuiTableCell: {
                root: {  //This can be referred from Material UI API documentation. 
                    padding: '4px 8px',
                    textAlign: 'center'
                },
              },
              MUIDataTableBodyRow: {
                root: {
                  '&:nth-child(odd)': { 
                    backgroundColor: '#dee2e6',
                  }
                }
              },
              MUIDataTableBodyCell: {
                root: {
                }
              }
            }
          })    
    }

    GetTable(themeProps, tableProps){
      return(
        <MuiThemeProvider theme={themeProps}>
             <MUIDataTable
              {...tableProps}
              data = {this.state.data}
             />
        </MuiThemeProvider>
      );
    }
}