import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import NavBar from '../../HomeNavBar'
import Footer from '../../HomeFooter'



const useStyles = makeStyles(() => ({
  content: {
    height: '80%',
    marginBottom:"30px"
  },
}));

const DefaultM = props => {
  const { children } = props;
  const classes = useStyles();
  return (
    <div >
      <NavBar />
      <main className={classes.content}>{children}
      </main>
      <Footer className={classes.separetor} />
    </div>
  );
};

DefaultM.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default DefaultM;