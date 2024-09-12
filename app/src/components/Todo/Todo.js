import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, IconButton, Container, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const validationSchema = Yup.object({
  todo: Yup.string()
    .required('Titulo não pode ser vazio')
});

const Todo = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [todos, setTodos] = React.useState([]);
  const [editIndex, setEditIndex] = React.useState(null);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      todo: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (editIndex !== null) {
        const updatedTodos = todos.map((todo, index) =>
          index === editIndex ? values.todo : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        setTodos([...todos, values.todo]);
      }
      resetForm();
    }
  });

  const handleEdit = (index) => {
    formik.setFieldValue('todo', todos[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setOpenDialog(true);
    setEditIndex(index);
  };

  const handleConfirmDialogDelete = () => {
      setTodos(todos.filter((_, i) => i !== editIndex));
      setOpenDialog(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ width: '100%', maxWidth: '100%', margin: 'auto', padding: 2 }}>
        <Typography component="h1" variant="h5">
          Tarefas
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="todo"
            label="Nova tarefa"
            name="todo"
            autoFocus
            value={formik.values.todo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.todo && Boolean(formik.errors.todo)}
            helperText={formik.touched.todo && formik.errors.todo}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            {editIndex !== null ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
          </Button>
        </Box>
        <List sx={{ marginTop: 2, bgcolor: 'background.paper'}}>
          {todos.map((todo, index) => (
            <ListItem
              key={index}
              sx={{borderColor:'#000'}}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={todo} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          <DialogContentText>Deseja remover este item da lista?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDialogDelete} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Todo;