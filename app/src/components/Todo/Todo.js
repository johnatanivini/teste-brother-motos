import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, List, Container } from '@mui/material';
import Status from '../../enum/status';
import ListaDeItens from './ListaDeItens';
import Modal from '../Modal/Modal';
import Tasks from '../../Persistencia/Tasks';

const taskModel = new Tasks();

const validationSchema = Yup.object({
  todo: Yup.string()
    .required('Titulo não pode ser vazio')
});

const Todo = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [todos, setTodos] = React.useState([]);
  const [editIndex, setEditIndex] = React.useState(null);


   React.useEffect(() => {
       setTodos(taskModel.list());
   }, [todos])

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
          if (index === editIndex) {
            todos[editIndex].titulo = values.todo;
              return todos[editIndex];
             }
          return todo
        });
        taskModel.setItem(updatedTodos);
        setEditIndex(null);
      } else {
        debugger
        todos.push({ titulo: values.todo, status: Status.pendente , data: new Date(), data_concluida: ''});
        taskModel.setItem(todos);
      }
      resetForm();
    }
  });

  const handleStatus = (index) => {
          let novasTodos = [...todos];
          novasTodos[index].status = novasTodos[index].status === Status.pendente ? Status.concluido : Status.pendente;
          taskModel.setItem(novasTodos);
  }

  const handleEdit = (index) => {
    formik.setFieldValue('todo', todos[index].titulo);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setOpenDialog(true);
    setEditIndex(index);
  };

  const handleConfirmDialogDelete = () => {
     taskModel.removeItem(editIndex)
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