import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, List, Container } from '@mui/material';
import Status from '../../enum/status';
import ListaDeItens from './ListaDeItens';
import Modal from '../Modal/Modal';
import Tasks from '../../Service/Task';
import Filter from '../Filter/Filter';
import TaskFilters from '../../Service/TaskFilter';
import DeleteIcon from '@mui/icons-material/DeleteForever'



const validationSchema = Yup.object({
   todo: Yup.string()
    .required('Titulo não pode ser vazio')
});

const Todo = () => {

  const tasks = React.useMemo(() => new Tasks('todos'), []);
  const taskFilter = React.useMemo(() => new TaskFilters('filter'), []);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogStatus, setOpenDialogStatus] = React.useState(false);
  const [todos, setTodos] = React.useState([]);
  const [editIndex, setEditIndex] = React.useState(null);
  const [filtered, setFiltered] = React.useState([]);

   React.useEffect(() => {
      let itens = tasks.list();
      let filter = taskFilter.getFilter();
      if (filter) {
           let filtered = taskFilter.filter(filter.titulo, "titulo");
           if (filter.order) {
              filtered = taskFilter.orderBy(`${filter.titulo}`, "titulo", `${filter.order}`)
           }
          setFiltered(filtered);
      } else {
        setFiltered(itens)
      }
      setTodos(itens);
   }, [todos, tasks, taskFilter]);

  const handleCloseDialog = () => {
    setOpenDialogStatus(false);
  };

  const handleClearFilter = () => {
     setFiltered(todos);
     taskFilter.clearFilter();
  }

  const openDialogDeleteCompleted = () => {
    setOpenDialogStatus(true);
  }
  const handleDeleteStatusCompleted = () => {
      tasks.clearItemCompleted();
      setOpenDialogStatus(false);
  }
  const closeDialogDeleteCompleted = () => {
    setOpenDialogStatus(false);
 }

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
            }
          return todo
        });
        tasks.setUpdateItem(updatedTodos);
        setEditIndex(null);
      } else {
        let todo = { titulo: values.todo, status: Status.pendente , data: new Date(), data_concluida: ''};
        tasks.addItem(todo);
      }
      resetForm();
    }
  });

  const handleStatus = (index) => {
          let novasTodos = todos;
          novasTodos[index].status = novasTodos[index].status === Status.pendente ? Status.concluido : Status.pendente;
          tasks.setUpdateItem(novasTodos);
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
    tasks.removeItem(editIndex)
    setOpenDialog(false);
  }

  return (
    <Container component="main" maxWidth="false">
      <Box sx={{
          display :'grid',
          gridTemplateColumns : '1fr 4fr',
          justifyItems: 'justify-content',
        }} >
          <Filter handleClearFilter={handleClearFilter} />
          <Box sx={{
              border: '1px solid #ccc',
              padding: '10px',
          }}>
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
              {filtered.map((todo, index) => (
                  <ListaDeItens key={index} todo={todo} index={index} handleStatus={handleStatus} handleEdit={handleEdit} handleDelete={handleDelete}/>
              ))}
            </List>
            <Box component="footer" sx={{width:"100%", textAlign: "right", borderTop: "solid 1px #cccccc "}}>
                  <Button variant="contained" color="secondary" sx={{mt:2}} onClick={() => openDialogDeleteCompleted()}> <DeleteIcon/>Remover Concluídas</Button>
            </Box>
          </Box>
          
      </Box>
      <Modal titleModal = "Atenção" textModal = "Deseja remover este item da lista" openDialog={openDialog} handleCloseDialog= {handleCloseDialog} handleConfirm={handleConfirmDialogDelete} />
      <Modal titleModal = "Atenção" textModal = "Todos os Itens como concluídos serão removidos!" openDialog={openDialogStatus} handleCloseDialog= {closeDialogDeleteCompleted} handleConfirm={handleDeleteStatusCompleted} />
    </Container>
  );
};

export default Todo;