import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { Add, Save, ArrowBack, DockOutlined, Tablet, TableChart } from '@material-ui/icons';
import { AppBar, Toolbar, Typography, Tooltip } from '@material-ui/core';

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
    <AppBar position='static' style={{ background: '#52616b' }}>
      <Toolbar style={{ maxWidth: '1200px', margin: '0 auto' }} className='flex items-center w-100'>
        <Typography variant='h6' style={{ flexGrow: 1, color: '#fdfdfe' }}> MY BUDGET</Typography>
        <span>&nbsp;&nbsp;</span>
        <Typography variant='h6' style={{ flexGrow: 1, color: '#fdfdfe' }}> {name} </Typography>
        <span>&nbsp;&nbsp;</span>
        <Tooltip title="Novo Orçamento">
          <Button variant='contained' style={{ width: '5%', margin: '0 1em 0 0', background: '#f0a500' }} onClick={() => orcamentoNew()}><TableChart /></Button>
        </Tooltip>
        <Tooltip title="Salvar">
          <Button variant='contained' style={{ width: '5%', margin: '0 1em 0 0', background: '#f0a500' }} onClick={() => saveUserData(dispatch, { email, orcamentos })}><Save /></Button>
        </Tooltip>
        <Tooltip title="Sair">
          <Button variant='contained' style={{ width: '5%', background: '#cf7500' }} onClick={() => logout()}><ArrowBack /></Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};