import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default ({ loading }) => (
  <div style={{
    background: 'rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    zIndex: '9999',
    display: loading ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <CircularProgress color='secondary' size={100} thickness={5} />
  </div>
);