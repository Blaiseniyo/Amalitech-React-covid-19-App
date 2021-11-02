import React, { useState } from 'react'
import { TextField, InputAdornment, Button,Grid, Typography } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { LockOpen, MailOutline,AccountCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import {restPasswordRequest} from "../../redux/actions/authActions"
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
      .required('Email is required')
});

function LoginForm(props) {
  const dispatch = useDispatch()
  const auth = useSelector(state=> state.auth);
  const [formData,setFormData] = useState({
    email:""
  })
  const classes = useStyles();
  const history = useHistory()

  return (
    <>
      <div className="rest-container">
        <div className="styled-container">
        <div className="form-container">

        <Grid container direction="column" spacing={3}>
            <Grid item sm={12}>
                <Typography variant="h6">Forgot your password?</Typography>
                <hr height="2px"/>
                <Typography 
                variant="subtitle1">Fill in your Email to the send you a rest password link </Typography>
            </Grid>
            <Grid item sm={12} >
            <Formik
            initialValues={formData}
            onSubmit={values => {
              dispatch(restPasswordRequest(values))
            }}
             validationSchema={validationSchema}
             className="container"
          >
            {({ values, errors, touched }) => (
          <Form  form-data='form-1'>
              <Field
                required
                name="email"
                id="email"
                className={classes.margin}
                label="Email"
                variant="outlined"
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
               <br></br>
               <Grid container direction="row" justifyContent="center" alignContent="center">
                    <Grid container justifyContent="center" alignItems="center"  item xs={12} sm={12} md={6} key={0}>
                        <Button type="submit" variant="contained" color="primary" 
                        className="button-login">Rest password</Button>
                        {/* </div> */}

                    </Grid>
               </Grid>
              </Form>
              )}
            </Formik>
            </Grid>

        </Grid>
        </div>
                
        </div>
      </div>
    </>
  )
}

export default LoginForm;