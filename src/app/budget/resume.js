import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, List, ListSubheader, Divider, ListItem, ListItemText, Checkbox, Typography} from '@material-ui/core';

import types from '../core/types';

export default ({ orcamento, title, valorPrevisto, valorReal, finalizado, despesas }) => {
  const dispatch = useDispatch();

  const orcamentoDisplay = (display) => {
    dispatch({ type: types.orcamentoDisplay, display });
  };

  return (
    <Card onClick={() => orcamentoDisplay(orcamento)} style={{ maxWidth: '1200px', margin: '0 auto', cursor: 'pointer' }} className='w-100'>
      <List dense={true} style={{ padding: 0 }}>

        <ListSubheader style={{ background: '#52616b', color: '#fdfdfe' }}>
          <Checkbox style={{ padding: '0.25rem', color: '#f0a500', margin: '0 0.5em 0 0' }} color='defaut' checked={finalizado} disabled={true} />
          {!!title ? <span style={{ color: '#fdfdfe', textTransform: 'uppercase', textAlign: 'center' }}>{title}</span> : <span className='i'>Sem orçamento...</span>}
          <Divider  style={{ background: '#c9d6df' }}/>

          <Typography variant='button' display="inline" style={{ color: '#f0a500', display: 'inline-block', margin: '0 1em 0 0' }}> PRV: </Typography>
          {!!valorPrevisto ? <span>R$: {valorPrevisto}</span> : <span className='i'>Sem valor previsto...</span>}

          <Divider />
          <Typography variant='button' display="inline" style={{ color: '#f0a500', display: 'inline-block', margin: '0 1em 0 0' }}> SLD: </Typography>
          {!!valorReal ? <span>R$: {valorReal}</span> : <span className='i'>Sem saldo...</span>}

        </ListSubheader>

        <Divider />
        <span>&nbsp;</span>
        {despesas.map((despesa, index) =>
          <>
            <ListItem style={{ paddingBottom: 0, paddingTop: 0, textDecoration: 'link' }} key={index}>
              <ListItemText>
                {/*  <Checkbox style={{ padding: '0.25rem' }} checked={despesa.done} color='#cf7500' disabled={true} /> */}
                {!!despesa.description ?<span style={{ color: '#52616b', textTransform: 'capitalize' }}><b>{despesa.description}</b></span>: <span style={{ color: '#52616b' }}><b>Sem descrição...</b></span>}
                <Divider style={{ background: '#c9d6df' }}/>

                {!!despesa.valorDespesa ? <span style={{ color: '#52616b'}}>R$: {despesa.valorDespesa}</span> : <span className='i' style={{ color: '#52616b' }}>R$: 00.00</span>}
              </ListItemText>
            </ListItem>
          </>
        )}
        <span>&nbsp;</span>
      </List>
    </Card >
  );
};