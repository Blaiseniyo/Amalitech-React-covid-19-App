import React from 'react'
import { TextField, InputAdornment, Button } from '@material-ui/core';
import { useDispatch} from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { LockOpen, MailOutline } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {signUp} from "../../redux/actions/authActions"
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
      .min(6),
  confirmPassword: yup
      .string()
      .required("Confirm Password")
      .when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf(
          [yup.ref("password")],
          "Passwords must be equal"
      )
  })

});

function LoginForm(props) {
  const dispatch = useDispatch()
 
  const classes = useStyles();


  return (
    <>
      <div className="container">
            <div>
            <Formik
            initialValues={{
              email:"",
              password:"",
              confirmPassword:""
            }}
            onSubmit={values => {
              const {email, password} = values
              dispatch(signUp({email, password},props.reset))
            }}
             validationSchema={validationSchema}
          >
            {({ values, errors, touched }) => (
          <Form  form-data='form-1'>
              <Field
                required
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
                required
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
              <Field
                required
                className={classes.margin}
                label="ConfirmPassword"
                type="Password"
                name="confirmPassword"
                id="confirmPassword"
                as={TextField}
                error={touched.confirmPassword && errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpen />
                    </InputAdornment>
                  ),
                }}
              />
               <br></br>
            <div style={{ display: "grid", gridTemplateColumns: "100% 0%", alignItems: "center", marginTop:"20px",  }}>
              <Button type="submit" variant="contained" color="primary" 
               className="button-login">Sign Up</Button>
            </div>
              </Form>
              )}
            </Formik>
           
      </div>
      </div>
    </>
  )
}

export default LoginForm;