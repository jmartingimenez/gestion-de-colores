import React from 'react';
import Button from '@material-ui/core/Button';
import { IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AxiosService from '../../../utils/AxiosService';
import Mensaje from '../../Mensaje/Mensaje';

export default function EditColorFormModal(props) {
  const [open, setOpen] = React.useState(false);
  const [idColor, setIdColor] = React.useState(0);
  const [inputEditColor, setInputEditColor] = React.useState("To Do");
  const mensajeRef = React.useRef();

  const handleClickOpen = () => {
    var id = props.data.idEdit;
    var nombre = props.data.nombreEdit;

    setIdColor(id);
    setInputEditColor(nombre);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditColor = () => {
    AxiosService.UpdateColor(idColor, inputEditColor)
    .then(res => {
      if(res.esValido){
        props.update(idColor, inputEditColor);
        setOpen(false);  
      }else{
        mensajeRef.current.updateMensaje(res.mensaje, res.esValido);
      }   
    });    
  };

  return (
    <>
      <Tooltip title="Editar">
        <IconButton 
          aria-label="Edit" 
          component="button" 
          style={{"padding": 0}}
          onClick = {handleClickOpen}>
            <EditIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-editar-color">Editar color</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Desde este simple formulario se puede editar el color seleccionado. No se permiten 
            colores existentes.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="inputEditColor"
            label="Editar color"
            type="text"
            value={inputEditColor}
            onInput={e => setInputEditColor(e.target.value)}
            fullWidth
          />
          <Mensaje ref={mensajeRef}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEditColor} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}