import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthToken } from '../contexts/AuthContext';
import { login } from '../data/authentication';

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required')
    .default(''),
  password: yup.string().required('Password is required').default(''),
});

export function LoginPage() {
  const { saveToken } = useAuthToken();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string>();

  const formik = useFormik({
    validationSchema: signInSchema,
    initialValues: signInSchema.cast({}),
    onSubmit: async (values) => {
      try {
        const { token } = await login({
          email: values.email,
          password: values.password,
        });

        saveToken(token);
        navigate('/');
      } catch (error) {
        console.log(error);
        setLoginError('Error in login. ' + (error as Error).message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        maxWidth="300px"
        margin="auto"
        display="flex"
        flexDirection="column"
        gap={2}
        marginTop={10}
      >
        <Typography variant="h5" align="center">
          Log In
        </Typography>

        <TextField
          label="Email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email ? formik.errors.email : undefined}
          disabled={formik.isSubmitting}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && !!formik.errors.password}
          helperText={
            formik.touched.password ? formik.errors.password : undefined
          }
          disabled={formik.isSubmitting}
        />

        <Button
          variant="contained"
          disabled={formik.isSubmitting}
          type="submit"
        >
          Sign In
        </Button>

        {loginError && <Typography color="red">{loginError}</Typography>}
      </Box>
    </form>
  );
}
