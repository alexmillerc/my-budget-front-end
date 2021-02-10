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
      <List style={{ background: '#d2d2d2', padding: 0 }}>
        <ListSubheader className='flex items-center pb2 pt2'>
          <TextField
            style={{ flexGrow: 1, background: '#ffffff', borderRadius: '4px' }}
            onChange={(event) => orcamentoTitle(event.target.value)}
            placeholder='Orçamento...'
            variant='outlined'
            value={title}
          />
          <Button onClick={() => receitaNew()}><Add /> Receita</Button>
          <Button onClick={() => orcamentoDel()}><Delete /> Orçamento</Button>
          <Button onClick={() => orcamentoDisplay(-1)}><Close /> Fechar</Button>
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