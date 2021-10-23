import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';

import "../../App.scss"
import { Place } from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import { connect } from 'react-redux'



const useStyles = makeStyles((theme) => ({
 
}));

function DataCard(props) {
 const { name , value} = props
  const classes = useStyles();

  return (
      <div className="card" >

    <Card className="card">
      <CardActionArea>
        {/* { props.pending ? 
        (<Skeleton variant='rect' animation="wave" className={classes.media} />)
        : */}
        <CardMedia
        //   className={classes.media}
        //   image={props.accommodation.photos}
        //   title={props.accommodation.title}
        />
        {/* } */}

        <CardContent className="card-content">
          <Typography gutterBottom variant="h6">
           {/* { props.pending ? (<Skeleton animation="wave" width="50%"/>)
           : (props.accommodation.title)} */}
           {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* { props.pending ? 
            (<React.Fragment>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" width='80%' />
            </React.Fragment>)
            : (props.accommodation.description)} */}
            ({value})
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
      {props.pending ? (<Skeleton animation='wave' width='20%' height='20px' />) :
        <Button size="small" color="primary" startIcon={<Place />}> {props.accommodation.city} </Button>
      }
      </CardActions> */}
    </Card>
      </div>
  );
}

const mapStateToProps = state => ({
  //pending: state.fetchAccommodations.pending,
})

export default connect(mapStateToProps, null)(DataCard);
