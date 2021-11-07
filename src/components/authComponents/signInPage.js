import React,{useState} from "react";
import GoogleLogin from "react-google-login";
import PropTypes from 'prop-types';
import {
  useSelector,
  useDispatch
}from "react-redux"

import { 
   Grid,
   Slide,
   Snackbar,
   Divider,
   Typography,
   Tabs,
   Tab,
   Box,
   makeStyles,
   Hidden
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';
import LoginForm from "./loginFrom";
import SignUpForm from "./signUp";
import Covid from "../../assets/COVID-19-1.jpg";
import { useHistory } from 'react-router-dom'
import {clearSnackbar,loginWithGoogle,signUpWithGoogle} from "../../redux/actions/authActions"
import "../../App.scss";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        
      },
    tabs:{
        backgroundColor:`#EEEEEE`,
        color:"black"
    },
    tab:{
        color:"black",
    },
    tabPanel:{
        color:"white"
    },
    spinner: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(10)
      },
      contain: {
        position: "relative",
        width: "100%",
        marginBottom: "2px",
        borderRadius: "3px"
      },
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        className={useStyles.tabPanel}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
  }

const SignIn = ()=>{
    const classes = useStyles();
    const auth = useSelector(state => state.auth);
    const dispath = useDispatch();
    const [value, setValue] = useState(0);
    const history = useHistory()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSuccess =(response)=>{
        dispath(loginWithGoogle(response.tokenId,history))
    }

    const handleSingUpSuccess = (response)=>{
        const data = {email:response.profileObj.email}
        dispath(signUpWithGoogle(data,response.tokenId,history))
    }
    const handleFailure = (response)=>{
        console.log(response)
    }

    const transitionSnackbar = (props)=>{
      return <Slide {...props} direction ="right"/>;
    }

    const closeTimer= () =>{
      dispath(clearSnackbar());
    }
    return(
        <div className="container">
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
          <Grid  container spacing={4} direction="row" className="signin-container" >
          <Hidden smDown>
              <Grid item xs={12} sm={12} md={6} key={0} className="left-page">
                <img src={Covid} alt="covid-testing" className="covid-pic"/>
              </Grid>
            </Hidden>
              <Divider/>
              <Grid item xs={12} sm={12} md={6} key={1} className="left-page">
              <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="white"
                  centered
                  className={classes.tabs}
              >
                      <Tab value={0} label="Sign In" className={classes.tab}  {...a11yProps(0)} />
                      <Tab value={1} label="Sign Up" className={classes.tab} {...a11yProps(1)} />
                  </Tabs>
                  <TabPanel value={value} index={0} >
                      
                  <LoginForm/>
                  <div className="container">
                      <div className="or-container">
                          <hr width="150px"/>
                          <Typography variant="subtitle2">or</Typography>
                          <hr width="150px" />
                      </div>
                      <div className="or-container">
                          <GoogleLogin
                              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                              buttonText="Login With Google"
                              onSuccess={handleSuccess}
                              onFailure={handleFailure}
                              cookiesPolicy={"single_host_origin"}
                          />
                      </div>
                  </div> 
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                      <SignUpForm reset={setValue}/>
                      <div className="container">
                      <div className="or-container">
                          <hr width="150px"/>
                          <Typography variant="subtitle2">or</Typography>
                          <hr width="150px" />
                      </div>
                      <div className="or-container">
                          <GoogleLogin
                              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                              buttonText="Sign Up With Google"
                              onSuccess={handleSingUpSuccess}
                              onFailure={handleFailure}
                              cookiesPolicy={"single_host_origin"}
                          />
                      </div>
                  </div>
                  </TabPanel>
              </Grid>
          </Grid>
        
        </div>
    )
}

export default SignIn;