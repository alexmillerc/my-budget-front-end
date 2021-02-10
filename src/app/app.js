import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar } from '@material-ui/core';

import Login from './shared/login';
import Budget from './budget/budget';
import types from './core/types';
import Loader from './shared/loader';

export default () => {
  const dispatch = useDispatch();
  const { authenticated, email, password, name, login, alert, loading } = useSelector(s => s);

  const alertHide = () => {
    dispatch({ type: types.alertHide });
  };

  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alert.open}
        autoHideDuration={5000} onClose={() => alertHide()} message={alert.message} />
      <Loader loading={loading} />
      {!authenticated && <Login email={email} password={password} name={name} login={login} />}
      {!!authenticated && <Budget email={email} name={name} />}
    </>
  );
};