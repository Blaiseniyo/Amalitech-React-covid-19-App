import React from 'react';
import { 
    AppBar,
    Toolbar,
    makeStyles,
    Container,
} from '@material-ui/core';

import log from "../assets/amalitech-log.png";

import "../App.scss"

const useStyles = makeStyles(theme => ({
    navDisplay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    back:{
        backgroundColor:"#EEEEEE"
    },
  }))

function Header (){
    const classes = useStyles()
    
    const amaliTeachLogo =<img
    style={{
      maxWidth: "60%",
      maxHeight: "6vh",
    }}
    alt="amalitech-log"
    src={log} />

    const displayDesktop = () => {
    return (
        <Toolbar>
            <Container maxWidth='lg' className={classes.navDisplay}>
                {amaliTeachLogo}
            </Container>
        </Toolbar>
        )
    }

     return(
         <React.Fragment>
            <AppBar position='static' className={classes.back}>{displayDesktop()}</AppBar>
         </React.Fragment>
     )
 
}
export default Header;

