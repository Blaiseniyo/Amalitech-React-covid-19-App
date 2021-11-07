import React from 'react'
import { TextField, InputAdornment, Button,Grid, Typography,Slide,
  Snackbar } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { LockOpen} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {createNewPassword,clearSnackbar} from "../../redux/actions/authActions";
import MuiAlert from '@material-ui/lab/Alert';
import "../../App.scss"


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: "100%"
  },
}));

const validationSchema = yup.object({
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
  const dispatch = useDispatch();
  const auth = useSelector(state=> state.auth);
  const classes = useStyles();
  const history = useHistory()
  const transitionSnackbar = (props)=>{
    return <Slide {...props} direction ="right"/>;
  }

  const closeTimer= () =>{
    dispatch(clearSnackbar());
  }
  return (
    <>
      <Snackbar
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
        </Snackbar>
      <div className="rest-container">
        <div className="styled-container">
        <div className="form-container">

        <Grid container direction="column" spacing={3}>
            <Grid item sm={12}>
                <Typography variant="h6">Create a New Password?</Typography>
                <hr height="2px"/>
                {/* <Typography 
                variant="subtitle1">Fill in your Email to the send you a rest password link </Typography> */}
            </Grid>
            <Grid item xs={12} >
            <Formik
            initialValues={{
              password:"",
              confirmPassword:""
            }}
            onSubmit={values => {
              dispatch(createNewPassword(props.location.search,values,history))
            }}
             validationSchema={validationSchema}
             className="container"
          >
            {({ values, errors, touched }) => (
          <Form  form-data='form-1'>
              <Field
                required
                name="password"
                id="password"
                type="Password"
                className={classes.margin}
                label="New Password"
                variant="outlined"
                as={TextField}
                error={touched.newPassword && errors.newPassword}
                helperText={touched.newPassword && errors.newPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpen/>
                    </InputAdornment>
                  ),
                }}
              />
              <Field
                required
                name="confirmPassword"
                id="confirmPassword"
                className={classes.margin}
                label="Confirm Password"
                variant="outlined"
                type="Password"
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
               <Grid container direction="row" justifyContent="center" alignContent="center">
                    <Grid container justifyContent="center" alignItems="center"  item xs={12} sm={12} md={6} key={0}>
                        <Button type="submit" variant="contained" color="primary" 
                        className="button-login">Create</Button>
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