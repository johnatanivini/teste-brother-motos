import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const Modal = (...props) => {
   let prop = props.shift()
    const {titleModal, textModal, openDialog, handleCloseDialog, handleConfirm} = prop;
    return (
      <>
        <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        
      >
        <DialogTitle>{titleModal}</DialogTitle>
        <DialogContent>
          <DialogContentText>{textModal}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      </>
    )
}
export default Modal;