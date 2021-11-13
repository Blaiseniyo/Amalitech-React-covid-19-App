import React from 'react'
import { TextField, InputAdornment, Button, Grid, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { LockOpen, MailOutline } from '@material-ui/icons';
import {login} from "../../redux/actions/authActions";
import {useDispatch} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import "../../App.scss"

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: "100%"
  },
}));

const validationSchema = yup.object({
  email: yup
      .string()
      .email('Invalid email')
      .required('Email is required'),
  password: yup
      .string()
      .required("Password is required")
});

function LoginForm(props) {
  const dispath = useDispatch();
  const classes = useStyles();
  const history = useHistory()

  return (
    <>
      <div >
          <Formik
            initialValues={{
              email:"",
              password:""
            }}
            onSubmit={values => {
              dispath(login(values,history))
            }}
             validationSchema={validationSchema}
          >
            {({ values, errors, touched }) => (
          <Form  form-data='form-1'>
              <Field
                name="email"
                id="email"
                className={classes.margin}
                label="Email"
                as={TextField}
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutline />
                    </InputAdornment>
                  ),
                }}
              />
              <Field
                className={classes.margin}
                label="Password"
                type="Password"
                name="password"
                id="password"
                as={TextField}
                error={touched.password && errors.password}
                helperText={touched.password && errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpen />
                    </InputAdornment>
                  ),
                }}
              />
               <Grid container direction="row" justifyContent="center" alignContent="space-between" spacing={1} className="container" style={{marginTop:"20px"}}> 
                    <Grid item  xs={12} sm={12} md={6} key={0} >
                        <Button type="submit" variant="contained" color="primary" style={{height:"30px",width:"100%"}} 
                        className="button-login">Sign In</Button>
                    </Grid>
                    <Grid item  xs={12} sm={12} md={6} key={2}>
                        <a onClick={()=> history.push("/request")}  className="forgot-password" ><Typography className="link" variant="subtitle1" > Forgot password?</Typography></a>
                    </Grid>
               </Grid>

              </Form>
              )}
            </Formik>
      </div>
    </>
  )
}


export default LoginForm;