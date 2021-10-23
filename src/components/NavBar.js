import React, {useState} from 'react';
import { 
    AppBar,
    Toolbar,
    Button,
    makeStyles,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container,
    Hidden,
    IconButton,
    Drawer
} from '@material-ui/core';

import { Menu } from '@material-ui/icons';

import LogoutIcon from '@material-ui/icons/ExitToApp';

import { getCountryCases } from '../redux/actions/casesAction';

import { getCountryVaccine } from "../redux/actions/vaccinesAction";

import {useDispatch} from "react-redux";

import log from "../assets/amalitech-log.png";

import Search from "./SearchBar";


const useStyles = makeStyles(theme => ({
    navDisplay: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    back:{
        backgroundColor:"#EEEEEE"
    },
  }))

function Header (){
    const classes = useStyles()
    const dispatch = useDispatch();
    const [countrySearch,setCountrySearch]= useState(null);
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleOnchange=(e)=>{
        const value = e.target.value.charAt(0).toUpperCase()+e.target.value.slice(1);
        setCountrySearch(value)
    }

    const handleKeyPress = (e)=>{
        if(e.keyCode === 13){
            dispatch(getCountryCases(countrySearch))
            dispatch(getCountryVaccine(countrySearch))
        }
    }
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
            <Hidden smUp>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                >
                <Menu className="toggle-button" />
                </IconButton>
            </Hidden>
            <Container maxWidth='lg' className={classes.navDisplay}>
                <Hidden xsDown>
                    {amaliTeachLogo}
                </Hidden>
                <Search onChange={handleOnchange} onKeyDown={handleKeyPress}/>
            </Container>
            <Hidden smDown>
                <Button href="/logout"  className={classes.logo} startIcon={ <LogoutIcon/> }>Logout</Button>
            </Hidden>
        </Toolbar>
        )
    }

     return(
         <React.Fragment>
            <AppBar position='static' className={classes.back}>{displayDesktop()}</AppBar>
            <Drawer
            anchor="left"
            open={open}
            onClose={handleDrawerClose}
          >
            <List>
              <ListItem button key="Logout" onClick={onclick}>
                <ListItemIcon
                  className={classes.navIcons}
                >
                  <LogoutIcon/>
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                />
              </ListItem>
        </List>
          </Drawer>
         </React.Fragment>
     )
 
}
export default Header;

