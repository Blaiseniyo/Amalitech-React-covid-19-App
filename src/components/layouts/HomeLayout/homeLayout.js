import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import NavBar from '../../HomeNavBar'
import Footer from '../../HomeFooter'



const useStyles = makeStyles(() => ({
  content: {
    height: '80%',
    marginBottom:"200px"
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
      <Footer style={{marginBottom:"30px"}} />
    </div>
  );
};

DefaultM.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default DefaultM;