import React from 'react';
import { 
    Card,
    CardActionArea,
    CardContent,
    Typography

}from '@material-ui/core';

import "../../App.scss"

function DataCard(props) {
 const { name , value} = props
  return (
      <div className="card" >
        <Card className="card">
          <CardActionArea>
              <CardContent className="card-content">
                  <Typography  variant="h6">{name}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">({value})</Typography>
              </CardContent>
          </CardActionArea>
        </Card>
      </div>
  );
}


export default DataCard;
