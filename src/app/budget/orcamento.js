import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, List, ListSubheader, TextField } from '@material-ui/core';
import { Add, Delete, Close } from '@material-ui/icons';

import types from '../core/types';
import BudgetReceita from './receita';

export default ({ orcamento, title, receitas }) => {
  const dispatch = useDispatch();

  const orcamentoTitle = (title) => {
    dispatch({ type: types.orcamentoTitle, orcamento, title });
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
      <List style={{ background: '#52616b', padding:0 }}>
        <ListSubheader className='flex items-center pb2 pt2' >
          <TextField
            style={{ flexGrow: 1, borderRadius: '4px', margin:'0.75rem 1em 0.75rem 0', background: '#fdfdfe'}}
            onChange={(event) => orcamentoTitle(event.target.value)}
            placeholder='Orçamento...'
            variant='outlined'
            value={title}
          />
          <Button onClick={() => receitaNew()} style={{ margin:'0 1em 0 0', background: '#f0a500' }}><Add /> Receita</Button>
          <Button onClick={() => orcamentoDel()} style={{ margin:'0 1em 0 0', background: '#f0a500' }}><Delete /> Orçamento</Button>
          <Button onClick={() => orcamentoDisplay(-1)} style={{ background: '#cf7500' }}><Close /> Fechar</Button>
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