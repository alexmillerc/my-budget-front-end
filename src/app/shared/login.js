import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, TextField, Divider } from '@material-ui/core';
import { PersonAdd, ArrowForward } from '@material-ui/icons';

import types from '../core/types';
import { signIn, signUp } from '../core/actions';

export default ({ email, password, name, login }) => {
  const dispatch = useDispatch();

  const changeEmail = (email) => {
    dispatch({ type: types.email, email });
  };

  const changePassword = (password) => {
    dispatch({ type: types.password, password });
  };

  const changeName = (name) => {
    dispatch({ type: types.name, name });
  };

  const setSignIn = () => {
    dispatch({ type: types.signIn });
  };

  const setSignUp = () => {
    dispatch({ type: types.signUp });
  };

  return (
    <div className='flex items-center justify-center w-100 h-100'>
      <Card className='flex flex-column pa3'>
        {!login && <TextField
          style={{ flexGrow: 1, marginBottom: '1rem' }}
          placeholder='Nome...'
          value={name}
          variant="outlined"
          onChange={(event) => changeName(event.target.value)}
        />}
        <TextField
          style={{ flexGrow: 1, marginBottom: '1rem' }}
          placeholder='Email...'
          value={email}
          variant="outlined"
          onChange={(event) => changeEmail(event.target.value)}
        />
        <TextField
          style={{ flexGrow: 1, marginBottom: '1rem' }}
          placeholder='Senha...'
          value={password}
          type="password"
          variant="outlined"
          onChange={(event) => changePassword(event.target.value)}
        />
        {!!login && <Button variant='contained'
          onClick={() => signIn(dispatch, { email, password })}><ArrowForward /> Entrar</Button>}
        {!login && <Button variant='contained'
          onClick={() => signUp(dispatch, { email, password, name })}><PersonAdd /> Cadastrar</Button>}
        <Divider style={{ margin: '0.75rem 0' }} />
        {!login && <Button onClick={() => setSignIn()}> Entrar </Button>}
        {!!login && <Button onClick={() => setSignUp()}> Cadastrar </Button>}
      </Card>
    </div>
  )
};