import React from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import RemoveIcon from "@mui/icons-material/RemoveCircle";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TaskFilters from "../../Service/TaskFilter";

const taskFilter = new TaskFilters();

const validationSchema = Yup.object({
    termo: Yup.string()
      .required('Termo para pesquisa não pode ser vazio'),
  });

const  Filter = (props)  => {
  
    const [order, setOrder] = React.useState('titulo');
    const {handleClearFilter} = props;
   
    const handleChangeOrder = (event) => {
        setOrder(event.target.value);
    }

    const handleCustomReset = () => {
        handleClearFilter();
        taskFilter.clearFilter();
    }
   
    const formik = useFormik({
        initialValues: {
          termo: '',
          order: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            taskFilter.setFilter(values.termo, order);
        },
      });
        return (
            <Box sx={{
                maxWidth: '100%',
                maxHeight: '100%',
                border: '1px solid #ccc',
                 marginRight: '10px',
                 padding: '10px'
           }}>
                    <Typography component="label" variant="h5" sx={{
                        textAlign: 'center',
                    }}>
                            Filtros:
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
                                id="termo"
                                label="Termo de pesquisa"
                                name="termo"
                                autoFocus
                                value={formik.values.termo }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.termo && Boolean(formik.errors.termo)}
                                helperText={formik.touched.termo && formik.errors.termo}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="order-select">Ordenar Por</InputLabel>
                                    <Select
                                    labelId="order-select"
                                    id="order"
                                    value={order ?? formik.values.order}
                                    label="Ordernar Por"
                                    onChange={handleChangeOrder}
                                >
                                    <MenuItem value="">
                                        <em>Selecione</em>
                                    </MenuItem>
                                    <MenuItem value="titulo">Titulo</MenuItem>
                                    <MenuItem value="data">Data</MenuItem>
                                    <MenuItem value="data_conclusao">Data Concluídas</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                sx={{ mt: 2 }}
                            >
                                <SearchIcon /> Buscar
                                </Button>
                                <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                onClick = {() => handleCustomReset()}
                                color="info"
                                sx={{ mt: 2 }}
                            >
                                <RemoveIcon /> Limpar
                                </Button>
                            </Box>
                        </Box>
        );
}

export default Filter;
