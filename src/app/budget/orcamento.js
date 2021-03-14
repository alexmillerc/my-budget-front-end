import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Checkbox, List, ListSubheader, TextField, Typography } from '@material-ui/core';
import { Add, Delete, Close } from '@material-ui/icons';

import types from '../core/types';
import BudgetReceita from './receita';

export default ({ orcamento, title, valorPrevisto, valorReal, finalizado, receitas }) => {
  const dispatch = useDispatch();

  const orcamentoTitle = (title) => {
    dispatch({ type: types.orcamentoTitle, orcamento, title });
  };

  const orcamentoValorPrevisto = (valorPrevisto) => {
    dispatch({ type: types.orcamentoValorPrevisto, orcamento, valorPrevisto });
  };

  const orcamentoValorReal = (valorReal) => {
    dispatch({ type: types.orcamentoValorReal, orcamento, valorReal });
  };

  const orcamentoFinalizado = (finalizado) => {
    dispatch({ type: types.orcamentoFinalizado, orcamento, finalizado });
  };

  const orcamentoDel = () => {
    dispatch({ type: types.orcamentoDel, orcamento });
    dispatch({ type: types.orcamentoDisplay, display: -1 });
  };

  const receitaNew = () => {
    dispatch({ type: types.receitaNew, orcamento });
  };

  const orcamentoDisplay = (display) => {
    dispatch({ type: types.orcamentoDisplay, display });
  };

  return (
    <Card className='w-100' style={{ overflowY: 'auto' }}>
      <List style={{ background: '#52616b', padding: 0 }}>
        <ListSubheader className='flex items-center pb2 pt2' >
          <Checkbox
            style={{ margin: '0 0.2em 0 0', color: '#fdfdfe'}}
            checked={finalizado}
            onChange={(event) => orcamentoFinalizado(event.target.checked)}
            color='defaut'
          />
          <TextField
            style={{ flexGrow: 1, borderRadius: '4px', margin: '0 1em 0 0', background: '#fdfdfe' }}
            onChange={(event) => orcamentoTitle(event.target.value)}
            placeholder='Orçamento...'
            variant='outlined'
            value={title}
          />
          <Button onClick={() => receitaNew()} style={{ width: '25%',  margin: '0 1em 0 0', background: '#f0a500' }}><Add /> Receita</Button>
        </ListSubheader>
        
        <ListSubheader className='flex items-center pb2 pt2' >
          <Typography variant='button' display="inline" style={{ margin: '0 1em 0 0', color: '#fdfdfe' }}> PRV: </Typography>
          <TextField
            style={{ flexGrow: 1, borderRadius: '4px', margin: '0 1em 0 0', background: '#fdfdfe' }}
            onChange={(event) => orcamentoValorPrevisto(event.target.value)}
            placeholder='Valor Previsto...'
            variant='outlined'
            value={valorPrevisto}
          />
          <Button onClick={() => orcamentoDel()} style={{ width: '25%', margin: '0 1em 0 0', background: '#f0a500' }}><Delete /> Orçamento</Button>
        </ListSubheader>
        
        <ListSubheader className='flex items-center pb2 pt2' >
          <Typography variant='button' display="inline" style={{ margin: '0 1em 0 0', color: '#fdfdfe' }}> SLD: </Typography>
          <TextField
            style={{ flexGrow: 1, borderRadius: '4px', margin: '0 1em 0 0', background: '#fdfdfe' }}
            onChange={(event) => orcamentoValorReal(event.target.value)}
            placeholder='Saldo...'
            variant='outlined'
            value={valorReal}
          />
          <Button onClick={() => orcamentoDisplay(-1)} style={{ width:'25%', margin: '0 1em 0 0', background: '#cf7500' }}><Close /> Fechar</Button>
        </ListSubheader>
      
        {receitas && receitas.map((receita, index) =>
          <BudgetReceita
            key={index}
            orcamento={orcamento}
            receita={index}
            done={receita.done}
            description={receita.description}
          />
        )}
      </List>
    </Card>
  );
};