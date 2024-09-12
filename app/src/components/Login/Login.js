import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Container, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Todo from '../Todo/Todo';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Endereço de e-mail inválido!')
    .required('Email é obrigatório!'),
  password: Yup.string()
    .min(6, 'Senha deve ter no minimo 6 caracteres!')
    .required('Senha é obrigatória!'),
});

const Login = () => {

  const [openDialog, setOpenDialog] = React.useState(false);
 const [isLogado, setIsLogado] = React.useState(false);
 const [error, setError] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        const storageEmail = localStorage.getItem('email');
        const storagePassword = localStorage.getItem('password');
        // Handle form submission
        if (storageEmail && storagePassword) {
            if (values.email === storageEmail && values.password === storagePassword) {
                setError(null);
                setOpenDialog(true);
                setIsLogado(true);
            } else {
                setError("Usuario ou senha incorreto!");
                setIsLogado(false);
            }
        } else {
            localStorage.setItem('email', values.email);
            localStorage.setItem('password', values.password);
            console.log('Email:', values.email);
            console.log('Senha:', values.password);
            setError(null);
            setOpenDialog(true);
        setIsLogado(true);
        }
    },
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (isLogado) {
    return <Todo />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
          padding: 3,
          border: '1px solid #ccc',
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Sucesso</DialogTitle>
        <DialogContent>
          Login efetuado com sucesso!
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Login;