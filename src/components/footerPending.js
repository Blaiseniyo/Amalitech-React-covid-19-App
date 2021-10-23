import React from 'react';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab'
import Card from "./DataCard/pendingCard"
import "../App.scss"

function FooterPending() {
 
    return (
        <div className="footer" >
            <div className="container" >
            <div className="country-container">
                <Skeleton animation="wave" variant="rect" width={40} height={23} className="flag-container" />
                <Skeleton animation="wave" width="20%" height={23} />
            </div>
            <div >
                <hr/>
                <Grid  container spacing={4} >
                    <Grid item xs={12} sm={6} md={4} key={0}>
                            <Card/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} key={1}>
                            <Card/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} key={2}>
                            <Card/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} key={3}>
                            <Card/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} key={4}>
                            <Card/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} key={5}>
                        <Card/>
                    </Grid>
                </Grid>
            </div>
            </div>
        </div>
    )
}

export default FooterPending;