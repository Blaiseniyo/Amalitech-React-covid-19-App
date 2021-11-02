import React, { useState } from 'react'
import { TextField, InputAdornment, Button, Grid, Snackbar, Slide } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import MuiAlert from '@material-ui/lab/Alert';
import { LockOpen, MailOutline } from '@material-ui/icons';
import {login,clearSnackbar} from "../../redux/actions/authActions";
import {useDispatch, useSelector} from "react-redux";
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
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })
  const auth = useSelector(state => state.auth);
  const dispath = useDispatch();
  const classes = useStyles();
  const history = useHistory()

  const transitionSnackbar = (props)=>{
    return <Slide {...props} direction ="right"/>;
}

const closeTimer= () =>{
  dispath(clearSnackbar());
}

  return (
    <>
      <div className="container">
      {/* <Snackbar
              open={auth.snackBarMessage.open}
              onClose={closeTimer}
              autoHideDuration={4000}
              TransitionComponent={transitionSnackbar}
          >
              <MuiAlert
                  severity={auth.snackBarMessage.severity}
                  variant='filled'
                  elevation={6}
              >{auth.snackBarMessage.message}</MuiAlert>
          </Snackbar> */}
          <Formik
            initialValues={formData}
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
               <Grid container direction="row" justifyContent="center" alignContent="center">
                    <Grid item item xs={12} sm={5} md={5} key={0}>
                        {/* <div style={{ display: "grid", gridTemplateColumns: "100% 0%", alignItems: "center", marginTop:"20px",  }}> */}
                        <Button type="submit" variant="contained" color="primary" 
                        className="button-login">Login</Button>
                        {/* </div> */}

                    </Grid>
                    <Grid item item xs={12} sm={7} md={7} key={2}>
                        {/* <div style={{ display: "grid", gridTemplateColumns: "100% 0%", alignItems: "center", marginTop:"20px",  }}> */}
                        <a href="/request" style={{ textAlign: "end" }} className="forgot-password" >Forgot password?</a>
                        {/* </div> */}

                    </Grid>
               </Grid>
            {/* <div style={{ display: "grid",
            marginTop:"20px", 
            gridTemplateColumns: "30% 70%", alignItems: "center" }}>
              <Button variant="contained" color="primary"
              type="submit"
               className="button-login">Login</Button>

              <a href="#" style={{ textAlign: "end" }} className="forgot-password">Forgot password?</a>
            </div> */}
              </Form>
              )}
            </Formik>
      </div>
    </>
  )
}


export default LoginForm;