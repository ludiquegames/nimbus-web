import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { TextField } from 'formik-mui';
import './App.css';
import { Button } from '@mui/material';
import IdentityService from './services/IdentityService';
import { useState } from 'react';

function App() {
  const [busy, setBusy] = useState(false);

  const signUp = async (values: any) => {
    try {
      setBusy(true);
      await IdentityService.SignUp(values.email, values.password);
      setBusy(false);
    } catch (e: any) {
      console.error(e);
    }
  };
  return (
    <div className="App">
      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '0 20px', overflow: 'hidden' }}>
        <h1>SignUp</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={yup.object({
            email: yup.string()
              .email('Email is invalid')
              .required('Required'),
            password: yup.string().min(6).required('Required'),
            confirmPassword: yup.string()
              .required('Required')
              .oneOf([yup.ref('password'), null], 'Passwords must match'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            signUp(values);
            setSubmitting(false);
          }}>
          {(formikProps) => (
            <Form>
              <div style={{ width: '100%' }}><Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
                margin="normal"
                fullWidth /></div>
              <div style={{ width: '100%' }}><Field
                component={TextField}
                name="password"
                type="password"
                label="Password"
                margin="normal"
                fullWidth /></div>
              <div style={{ width: '100%' }}><Field
                component={TextField}
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                margin="normal"
                fullWidth /></div>
              <div style={{ width: '100%' }}><Button
                type="submit"
                variant="contained"
                disabled={busy || !formikProps.isValid}
                fullWidth>Submit</Button></div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default App;
