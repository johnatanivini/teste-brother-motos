import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, List, Container } from '@mui/material';
import Status from '../../enum/status';
import ListaDeItens from './ListaDeItens';
import Modal from '../Modal/Modal';


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
        const updatedTodos = todos.map((todo, index) =>  {
          debugger
          if (index === editIndex) {
              todos[editIndex].titulo = values.todo;
              return todos[editIndex];
             }
          return todo
        });
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        todos.push({ titulo: values.todo, status: Status.pendente , data: new Date(), data_concluida: ''});
        setTodos(todos);
      }
      resetForm();
    }
  });

  const handleStatus = (index) => {
          let novasTodos = [...todos];
          novasTodos[index].status = novasTodos[index].status === Status.pendente ? Status.concluido : Status.pendente;
          setTodos(novasTodos);
  }

  const handleEdit = (index) => {
    setEditIndex(index);
    formik.setFieldValue('todo', todos[index].titulo);
  };

  const handleDelete = (index) => {
    setEditIndex(index);
    setOpenDialog(true);
  };

  const handleConfirmDialogDelete = () => {
      setTodos(todos.filter((_, i) => i !== editIndex));
      setOpenDialog(false);
  }

  return (
    <Container component="main" maxWidth="false">
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
              <ListaDeItens todo={todo} index={index} handleStatus={handleStatus} handleEdit={handleEdit} handleDelete={handleDelete}/>
          ))}
        </List>
      </Box>
      <Modal titleModal = "Atenção" textModal = "Deseja remover este item da lista" openDialog={openDialog} handleCloseDialog= {handleCloseDialog} handleConfirm={handleConfirmDialogDelete} />
    </Container>
  );
};

export default Todo;