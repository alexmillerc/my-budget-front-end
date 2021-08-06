import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, List, ListSubheader, Divider, ListItem, ListItemText, Checkbox, Typography } from '@material-ui/core';

import types from '../core/types';
import despesa from './despesa';

export default ({ orcamento, title, valorPrevisto, valorReal, finalizado, despesas }) => {
  const dispatch = useDispatch();


  const orcamentoDisplay = (display) => {
    dispatch({ type: types.orcamentoDisplay, display });
  };

  if (finalizado === false) {
    return (
      <Card onClick={() => orcamentoDisplay(orcamento)} style={{ maxWidth: '1200px', margin: '0 auto', cursor: 'pointer' }} className='w-100'>
        <List dense={true} style={{ padding: 0 }}>

          <ListSubheader style={{ background: '#52616b', color: '#fdfdfe' }}>
            <Checkbox style={{ padding: '0.25rem', color: '#f0a500', margin: '0 0.5em 0 0' }} color='defaut' checked={finalizado} disabled={true} />
            {!!title ? <span style={{ color: '#fdfdfe', textTransform: 'uppercase', textAlign: 'center' }}>{title}</span> : <span className='i'>Sem orçamento...</span>}
            <Divider style={{ background: '#c9d6df' }} />

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
                
                  {/*  <Checkbox style={{ padding: '0.25rem' }} checked={despesa.done} color='#cf7500' disabled={true} /> */}

                  {(() => {
                    if (despesa.done == false) {
                      return (
                        <ListItemText>
                          {!!despesa.description ? <span style={{ color: '#d2691e', textTransform: 'capitalize' }}><b>{despesa.description}</b></span> : <span className='i' style={{ color: '#c9d6df' }}><b>Sem descrição</b></span>}
                          <Divider style={{ backgroundColor: '#52616b' }} />
                          {!!despesa.valorDespesa ? <span style={{ color: '#d2691e' }}>R$: {despesa.valorDespesa}</span> : <span className='i' style={{ color: '#c9d6df' }}>R$:</span>}
                        </ListItemText>

                      )
                    } else {
                      return (
                        <ListItemText>
                          {!!despesa.description ? <span style={{ color: '#52616b', textTransform: 'capitalize' }}><b>{despesa.description}</b></span> : <span className='i' style={{ color: '#c9d6df' }}><b>Sem descrição</b></span>}
                          <Divider style={{ backgroundColor: '#52616b' }} />
                          {!!despesa.valorDespesa ? <span style={{ color: '#52616b' }}>R$: {despesa.valorDespesa}</span> : <span className='i' style={{ color: '#c9d6df' }}>R$:</span>}
                        </ListItemText>

                      )
                    }
                  })()}

                 
              </ListItem>
            </>
          )}
          <span>&nbsp;</span>
        </List>
      </Card >
    );

  }
  return (
    <Card onClick={() => orcamentoDisplay(orcamento)} style={{ maxWidth: '1200px', margin: '0 auto', cursor: 'pointer' }} className='w-100'>
      <List dense={true} style={{ padding: 0 }}>

        <ListSubheader style={{ background: '#52616b', color: '#c9d6df' }}>
          <Checkbox style={{ padding: '0.25rem', color: '#f0a500', margin: '0 0.5em 0 0' }} color='defaut' checked={finalizado} disabled={true} />
          {!!title ? <span style={{ color: '#c9d6df', textTransform: 'uppercase', textAlign: 'center' }}>{title}</span> : <span className='i'>Sem orçamento...</span>}
          <Divider style={{ background: '#c9d6df' }} />

          <Typography variant='button' display="inline" style={{ color: '#c9d6df', display: 'inline-block', margin: '0 1em 0 0' }}> PRV: </Typography>
          {!!valorPrevisto ? <span>R$: {valorPrevisto}</span> : <span className='i'>Sem valor previsto...</span>}

          <Divider />
          <Typography variant='button' display="inline" style={{ color: '#c9d6df', display: 'inline-block', margin: '0 1em 0 0' }}> SLD: </Typography>
          {!!valorReal ? <span>R$: {valorReal}</span> : <span className='i'>Sem saldo...</span>}

        </ListSubheader>

        <Divider />
        <span>&nbsp;</span>
        {despesas.map((despesa, index) =>
          <>
            <ListItem style={{ paddingBottom: 0, paddingTop: 0, textDecoration: 'link' }} key={index}>
              <ListItemText>
                {/*  <Checkbox style={{ padding: '0.25rem' }} checked={despesa.done} color='#cf7500' disabled={true} /> */}
                {!!despesa.description ? <span style={{ color: '#c9d6df', textTransform: 'capitalize' }}><b>{despesa.description}</b></span> : <span className='i' style={{ color: '#c9d6df' }}><b>Sem descrição</b></span>}
                <Divider style={{ background: '#c9d6df' }} />

                {!!despesa.valorDespesa ? <span style={{ color: '#c9d6df' }}>R$: {despesa.valorDespesa}</span> : <span className='i' style={{ color: '#c9d6df' }}>R$:</span>}
              </ListItemText>
            </ListItem>
          </>
        )}
        <span>&nbsp;</span>
      </List>
    </Card >
  );

};