import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { Add, Save, ArrowBack } from '@material-ui/icons';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import types from '../core/types';
import { saveUserData } from '../core/actions';

export default ({ email, name, orcamentos }) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: types.logout });
  };

  const orcamentoNew = () => {
    dispatch({ type: types.orcamentoNew });
  };

  return (
    <AppBar position='static' style={{ background: '#212121' }}>
      <Toolbar style={{ maxWidth: '1200px', margin: '0 auto' }} className='flex items-center w-100'>
        <Typography variant='h6' style={{ flexGrow: 1 }}> My Budget </Typography>
        <Typography variant='h6' style={{ flexGrow: 1 }}> {name} </Typography>
        <Button variant='contained' color='default' onClick={() => logout()}><ArrowBack /> Logout</Button>
        <Button variant='contained' color='default' onClick={() => orcamentoNew()}><Add /> Orçamento</Button>
        <Button variant='contained' color='default' onClick={() => saveUserData(dispatch, { email, orcamentos })}><Save /> Salvar</Button>
      </Toolbar>
    </AppBar>
  );
};