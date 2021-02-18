import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Checkbox, Divider, ListItem, TextField } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import types from '../core/types';

export default ({ orcamento, receita, done, description }) => {
  const dispatch = useDispatch();

  const receitaDel = () => {
    dispatch({ type: types.receitaDel, orcamento, receita });
  };

  const receitaDone = (done) => {
    dispatch({ type: types.receitaDone, orcamento, receita, done });
  };

  const receitaDesc = (description) => {
    dispatch({ type: types.receitaDesc, orcamento, receita, description });
  };

  return (
    <>
      <Divider />
      <ListItem className='flex items-center' style={{ background: '#fdfdfe' }}>
        <Checkbox
          checked={done}
          onChange={(event) => receitaDone(event.target.checked)}
          color='default'
        />
        <TextField
          style={{ flexGrow: 1 }}
          placeholder='Receita...'
          value={description}
          onChange={(event) => receitaDesc(event.target.value)}
        />
        <Button onClick={() => receitaDel()}><Delete /> Receita</Button>
      </ListItem>
    </>
  );
};