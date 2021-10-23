import React, {useEffect, useState} from 'react'
import { AppBar, Toolbar, Button, makeStyles, List, Container, Hidden, Typography, TextField} from '@material-ui/core'
import {PersonAddOutlined, PersonOutlined} from '@material-ui/icons'
import { Field, Form, Formik} from 'formik';
// import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { getAllCases , getCountryCases } from '../redux/actions/casesAction';
import { getAllVaccine, getCountryVaccine } from "../redux/actions/vaccinesAction"
import {useDispatch,useSelector} from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import Select from "./selectWrapper"
import log from "../assets/amalitech-log.png"
// import SideDrawer from './SideDrawer'

const navLinks = [
    {title: 'Login', path: '/login'},
    {title: 'Signup', path: '/signup'}
]

const useStyles = makeStyles(theme => ({
    navDisplay: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        // position:"relative",
        // left:"29px",
        textDecorationLine: 'none',
        color: 'black',
        fontWeight:"bold"
    },
    back:{
        backgroundColor:"#EEEEEE"
    },
  }))

function Header (){
    const classes = useStyles()
    const dispatch = useDispatch();
    const [countrySearch,setCountrySearch]= useState(null);
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
    src={log} />

    const displayDesktop = () => {
    return (
        <Toolbar>
            <Container maxWidth='lg' className={classes.navDisplay}>
                {amaliTeachLogo}
                {/* <Formik 
                    //initialValues={formData}
                    onSubmit={values => {
                        
                    }}
                   // validationSchema={validationSchema}
                    >
                    {({ values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
                        <Form  >
                            <Select
                                name="projectId"
                                label="Project"
                                keyWord='name'
                                defaultValue={projects.project?(projects.projects.find(project=>{
                                    return project.id===values["projectId"]
                                })):[]}
                                options={projects.projects?projects.projects:[]}
                                setProjectId={setProjectId}
                                setInstitutionId={setInstitutionId}
                                action={getProject}
                                values={values}
                                dependence="institutionId"
                                setFormData={setFormData}
                                className={classes.forminput}
                                error={touched.projectId && errors.projectId}
                                helperText={touched.projectId && errors.projectId}
                            />
                            
                        </Form>
                        )}
                    </Formik> */}
                <TextField placeholder={`Search For a Country`} onChange={handleOnchange} onKeyDown={handleKeyPress}/>
                <Hidden smDown>
                    {/* <List component='nav'> */}
                        {/* <SearchIcon/> */}
                        {/* <Select/> */}
                        {/* <div className="search"> */}
                            {/* <TextField placeholder="Search For a Country"/> */}
                        {/* </div> */}
                        <Button href="/login"  className={classes.logo} startIcon={ <LogoutIcon/> }>Logout</Button>
                        {/* <Button href="/signup" className={classes.logo} startIcon = { <PersonAddOutlined/> }>Signup</Button> */}
                    {/* </List> */}
                </Hidden>
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
