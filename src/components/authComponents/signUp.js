import React, { useState } from 'react'
import { TextField, InputAdornment, Button } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { LockOpen, MailOutline,AccountCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import {signUp} from "../../redux/actions/authActions"
import "../../App.scss"


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: "100%"
  },
}));

const validationSchema = yup.object({
  userName: yup
      .string()
      .min(4)
      .required('User Name is required'),
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
          "Passwords must be equail"
      )
  })

});

function LoginForm(props) {
  const dispatch = useDispatch()
  const auth = useSelector(state=> state.auth);
  const [formData,setFormData] = useState({
    userName:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  const classes = useStyles();
  const history = useHistory()

  return (
    <>
      <div className="container">
            <div>
            <Formik
            initialValues={formData}
            onSubmit={values => {
              const {email, password,userName} = values
              dispatch(signUp({email, password,userName}))
            }}
             validationSchema={validationSchema}
          >
            {({ values, errors, touched }) => (
          <Form  form-data='form-1'>
              <Field
                required
                name="userName"
                id="userName"
                className={classes.margin}
                label="User Name"
                as={TextField}
                error={touched.userName && errors.userName}
                helperText={touched.userName && errors.userName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle/>
                    </InputAdornment>
                  ),
                }}
              />
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