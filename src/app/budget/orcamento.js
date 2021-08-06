import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Checkbox, List, ListSubheader, TextField, Typography, InputAdornment, Tooltip } from '@material-ui/core';
import { Money, Delete, Close } from '@material-ui/icons';

import types from '../core/types';
import BudgetDespesa from './despesa';

export default ({ orcamento, title, valorPrevisto, valorReal, finalizado, despesas }) => {
  const dispatch = useDispatch();

  const orcamentoTitle = (title) => {
    dispatch({ type: types.orcamentoTitle, orcamento, title });
  };

  if (valorPrevisto === 0) {
    valorPrevisto = ''
  };

  const orcamentoValorPrevisto = (valorPrevisto) => {
    dispatch({ type: types.orcamentoValorPrevisto, orcamento, valorPrevisto });
  };

  if (valorReal === 0) {
    valorReal = ''
  };

  const orcamentoValorReal = (valorPrevisto) => {

    valorReal = valorPrevisto
    dispatch({ type: types.orcamentoValorReal, orcamento, valorReal });
  };

  const orcamentoFinalizado = (finalizado) => {
    dispatch({ type: types.orcamentoFinalizado, orcamento, finalizado });
    dispatch({ type: types.orcamentoDisplay, display: -1 });
  };

  const orcamentoDel = () => {
    dispatch({ type: types.orcamentoDel, orcamento });
    dispatch({ type: types.orcamentoDisplay, display: -1 });
  };

  const despesaRecursoNew = () => {

    /* válida se o titulo esta preenchido e se existe valor previsto */
    if (title == '') {
      dispatch({ type: types.alertShow, alert: `Titulo em branco, favor preencher!` });
    } else if (valorPrevisto == 0 || valorPrevisto == '') {
      dispatch({ type: types.alertShow, alert: `Valor Previsto zerado, favor preencher!` });
    } else {
      dispatch({ type: types.despesaNew, orcamento });
    }

  };

  const orcamentoDisplay = (display) => {
    dispatch({ type: types.orcamentoDisplay, display });
  };


  if (finalizado === false) {
    return (
      <Card className='w-100' style={{ overflowY: 'auto' }}>
        <List style={{ background: '#52616b', padding: 0 }}>
          <ListSubheader className='flex items-center pb2 pt2' >
            <Tooltip title="Finalizar Orçamento">
              <Checkbox
                style={{ margin: '0 0.2em 0 0', color: '#fdfdfe' }}
                checked={finalizado}
                onChange={(event) => orcamentoFinalizado(event.target.checked)}
                color='defaut'
              />
            </Tooltip>

            <TextField
              style={{ flexGrow: 1, borderRadius: '4px', margin: '0 1em 0 0', background: '#fdfdfe', color: '#52616b' }}
              onChange={(event) => orcamentoTitle(event.target.value)}
              placeholder='Orçamento...'
              inputProps={{ style: { color: '#52616b' } }}
              variant='outlined'
              value={title}
            />
            <Tooltip title="Adicionar valores">
              <Button onClick={() => despesaRecursoNew()} style={{ width: '10%', margin: '0 1em 0 0', background: '#f0a500' }}><Money /></Button>
            </Tooltip>
          </ListSubheader>

          <ListSubheader className='flex items-center pb2 pt2' >
            <Tooltip title="Valor Previsto">
              <Typography variant='button' display="inline" style={{ margin: '0 1em 0 0', color: '#fdfdfe' }}> PRV: </Typography>
            </Tooltip>
            <TextField
              style={{ flexGrow: 1, borderRadius: '4px', margin: '0 1em 0 0', background: '#fdfdfe', color: '#52616b' }}
              onChange={(event) => (orcamentoValorPrevisto(event.target.value), orcamentoValorReal(event.target.value))}
              placeholder='Valor Previsto...'
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>, style: { color: '#52616b' }, inputProps: { min: "0.00", step: "0.01" }
              }}
              type="number"
              variant='outlined'
              value={valorPrevisto}
            />

            <Tooltip title="Excluir Orçamento">
              <Button onClick={() => orcamentoDel()} style={{ width: '10%', margin: '0 1em 0 0', background: '#f0a500' }}><Delete /></Button>
            </Tooltip>
          </ListSubheader>

          <ListSubheader className='flex items-center pb2 pt2' >
            <Tooltip title="Saldo">
              <Typography variant='button' display="inline" style={{ margin: '0 1em 0 0', color: '#fdfdfe' }}> SLD: </Typography>
            </Tooltip>
            <TextField
              disabled
              style={{ flexGrow: 1, borderRadius: '4px', margin: '0 1em 0 0', background: '#c9d6df', color: '#52616b' }}
              onChange={(event) => orcamentoValorReal(event.target.value)}
              placeholder='Saldo...'
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>, style: { color: '#52616b' }, inputProps: { min: "0.00", step: "0.01" }
              }}
              type="number"
              variant='outlined'
              value={valorReal}
            />
            <Tooltip title="Fechar">
              <Button onClick={() => orcamentoDisplay(-1)} style={{ width: '10%', margin: '0 1em 0 0', background: '#cf7500' }}><Close /></Button>
            </Tooltip>
          </ListSubheader>

          {despesas && despesas.map((despesa, index) =>
            <BudgetDespesa
              key={index}
              orcamento={orcamento}
              despesa={index}
              done={despesa.done}
              description={despesa.description}
              valorDespesa={despesa.valorDespesa}
              finalizado={finalizado}
              valorPrevisto={valorPrevisto}
              valorReal={valorReal}
            />
          )}
        </List>
      </Card>
    );
  };
  return (
    <Card className='w-100' style={{ overflowY: 'auto' }}>
      <List style={{ background: '#52616b', padding: 0 }}>
        <ListSubheader className='flex items-center pb2 pt2' >
          <Tooltip title="Abrir Orçamento">
            <Checkbox
              style={{ margin: '0 0.2em 0 0', color: '#fdfdfe' }}
              checked={finalizado}
              onChange={(event) => orcamentoFinalizado(event.target.checked)}
              color='defaut'
            />
          </Tooltip>
          <TextField
            disabled
            style={{ flexGrow: 1, borderRadius: '4px', margin: '0 1em 0 0', background: '#c9d6df', color: '#52616b' }}
            onChange={(event) => orcamentoTitle(event.target.value)}
            placeholder='Orçamento...'
            inputProps={{ style: { color: '#52616b' } }}
            variant='outlined'
            value={title}
          />
        </ListSubheader>

        <ListSubheader className='flex items-center pb2 pt2' >
          <Tooltip title="Valor Previsto">
            <Typography variant='button' display="inline" style={{ margin: '0 1em 0 0', color: '#fdfdfe' }}> PRV: </Typography>
          </Tooltip>
          <TextField
            disabled
            style={{ flexGrow: 1, borderRadius: '4px', margin: '0 1em 0 0', background: '#c9d6df', color: '#52616b' }}
            onChange={(event) => orcamentoValorPrevisto(event.target.value)}
            placeholder='Valor Previsto...'
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>, style: { color: '#52616b' }, inputProps: { min: "0.00", step: "0.01" }
            }}
            type="number"
            variant='outlined'
            value={valorPrevisto}
          />
        </ListSubheader>

        <ListSubheader className='flex items-center pb2 pt2' >
          <Tooltip title="Saldo">
            <Typography variant='button' display="inline" style={{ margin: '0 1em 0 0', color: '#fdfdfe' }}> SLD: </Typography>
          </Tooltip>
          <TextField
            disabled
            style={{ flexGrow: 1, borderRadius: '4px', margin: '0 1em 0 0', background: '#c9d6df', color: '#52616b' }}
            onChange={(event) => orcamentoValorReal(event.target.value)}
            placeholder='Saldo...'
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>, style: { color: '#52616b' }, inputProps: { min: "0.00", step: "0.01" }
            }}
            type="number"
            variant='outlined'
            value={valorReal}
          />
        </ListSubheader>

        {despesas && despesas.map((despesa, index) =>
          <BudgetDespesa
            key={index}
            orcamento={orcamento}
            despesa={index}
            done={despesa.done}
            description={despesa.description}
            valorDespesa={despesa.valorDespesa}
            finalizado={finalizado}
            valorPrevisto={valorPrevisto}
            valorReal={valorReal}
          />
        )}
      </List>
    </Card>
  );
};