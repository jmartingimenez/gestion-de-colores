import React from 'react';
import Button from '@material-ui/core/Button';
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AxiosService from '../../../utils/AxiosService';
import Mensaje from '../../Mensaje/Mensaje';

export default function AddColorFormModal(props) {
  const [open, setOpen] = React.useState(false);
  const [inputNuevoColor, setInputNuevoColor] = React.useState("");
  const mensajeRef = React.useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateColor = () => {
    AxiosService.AddColor(inputNuevoColor)
    .then(res => {
      if(res.esValido){
        var nuevoColor = res.mensaje;
        props.update(nuevoColor.Id, nuevoColor.Nombre, nuevoColor.Creacion);
        setOpen(false);  
      }else{
        mensajeRef.current.updateMensaje(res.mensaje, res.esValido);
      }   
    });    
  };

  return (
    <>
      <Tooltip title="Agregar">
        <IconButton 
          aria-label="Add" 
          component="button" 
          style={{"padding": 0}}
          onClick = {handleClickOpen}>
            <AddIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nuevo color</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Desde este simple formulario se puede agregar un nuevo color. No se permite 
            colores existentes.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="inputNuevoColor"
            label="Nuevo color"
            type="text"
            onInput={e => setInputNuevoColor(e.target.value)}
            fullWidth
          />
          <Mensaje ref={mensajeRef}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreateColor} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}