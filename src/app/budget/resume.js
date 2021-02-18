import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, List, ListSubheader, Divider, ListItem, ListItemText, Checkbox } from '@material-ui/core';

import types from '../core/types';

export default ({ orcamento, title, receitas }) => {
  const dispatch = useDispatch();

  const orcamentoDisplay = (display) => {
    dispatch({ type: types.orcamentoDisplay, display });
  };

  return (
    <Card onClick={() => orcamentoDisplay(orcamento)} style={{ maxWidth: '1200px', margin: '0 auto', cursor: 'pointer' }} className='w-100'>
      <List dense={true} style={{ padding: 0 }}>
        <ListSubheader  style={{ background: '#52616b', color:'#fdfdfe'}}>
          {!!title ? <span>{title}</span> : <span className='i'>Sem título...</span>}
        </ListSubheader>
        <Divider />
        {receitas.map((receita, index) =>
          <>
            <ListItem style={{ paddingBottom: 0, paddingTop: 0, textDecoration: 'link' }} key={index}>
              <ListItemText>
                <Checkbox style={{ padding: '0.25rem' }} checked={receita.done} color='#cf7500' disabled={true} />
                {receita.description}
              </ListItemText>
            </ListItem>
          </>
        )}
      </List>
    </Card>
  );
};