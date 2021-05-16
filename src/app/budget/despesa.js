import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Divider, TextField, Typography, ListSubheader, InputAdornment } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import types from '../core/types';

export default ({ orcamento, despesa, description, valorDespesa }) => {
  const dispatch = useDispatch();

  const despesaDel = () => {
    dispatch({ type: types.despesaDel, orcamento, despesa });
  };

  const despesaDesc = (description) => {
    dispatch({ type: types.despesaDesc, orcamento, despesa, description });
  };

  if (valorDespesa===0) {
    valorDespesa = ''
  };

  const despesaValorDespesa = (valorDespesa) => {
    dispatch({ type: types.despesaValorDespesa, orcamento, despesa, valorDespesa });
  };

  return (
    <>
      <Divider style={{ background: "#c9d6df"}} />

      <ListSubheader className='flex items-center pb2 pt2' style={{ background: '#fdfdfe' }}>

        <Typography variant='button' display="inline" style={{ margin: '0 1em 0 0', color: '#52616b' }}> DSP: </Typography>
        <TextField
          style={{ flexGrow: 1, color: '#52616b' }}
          display="inline"
          fullWidth
          placeholder='Descrição...'
          inputProps={{ style: { color: '#52616b'}}}
          value={description}
          onChange={(event) => despesaDesc(event.target.value)}
        />
        <span>&nbsp;&nbsp;&nbsp;</span>
        <TextField
          style={{ flexGrow: 1, borderRadius: '4px', margin: '0 1em 0 0', background: '#fdfdfe', color: '#52616b' }}
          display="inline"
          onChange={(event) => despesaValorDespesa(event.target.value)}
          placeholder='Valor...'
          InputProps={{
            startAdornment: <InputAdornment position="start">R$:</InputAdornment>, style: { color: '#52616b' }, inputProps: { min: "0.00", step: "0.01"}
          }}
          type="number"
          value={valorDespesa}
        />

        <Button onClick={() => despesaDel()} style={{ width: '10%', margin: '0 1em 0 0', background: '#fdfdfe' }}><Delete style={{ color: '#cf7500' }} /></Button>
      </ListSubheader>

    </>
  );
};