import React from 'react';
import { 
    Card,
    CardActionArea,
    CardContent
}from '@material-ui/core';

import "../../App.scss"
import { Skeleton } from '@material-ui/lab'

function PendingCard() {
  return (
      <div className="card" >
        <Card className="card">
          <CardActionArea>
              <CardContent className="card-content">
                  <Skeleton animation="wave" width="70%"  height={50} className="skeleton" />
                  <Skeleton animation="wave" width="25%" height={20} className="skeleton" />
              </CardContent>
          </CardActionArea>
        </Card>
      </div>
  );
}


export default PendingCard;
