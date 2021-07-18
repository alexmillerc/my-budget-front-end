import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Checkbox, List, ListSubheader, TextField, Typography, InputAdornment } from '@material-ui/core';
import { Add, Remove, Delete, Close } from '@material-ui/icons';

import types from '../core/types';
import BudgetDespesa from './despesa';

var tipoValor = false

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

  const despesaNew = () => {

    /* válida se existe valor previsto preenchido */
    if (valorPrevisto == 0 || valorPrevisto == '') {
      dispatch({ type: types.alertShow, alert: `Valor Previsto zerado, favor preencher!` });
    } else {
      tipoValor = false 
      console.log("despesa")
      console.log(tipoValor)
      dispatch({ type: types.despesaNew, orcamento });
    }

  };

  const recursoNew = () => {

    /* válida se existe valor previsto preenchido */
    if (valorPrevisto == 0 || valorPrevisto == '') {
      dispatch({ type: types.alertShow, alert: `Valor Previsto zerado, favor preencher!` });
    } else {
      tipoValor = true 
      console.log("recurso")
      console.log(tipoValor)
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
            <Checkbox
              style={{ margin: '0 0.2em 0 0', color: '#fdfdfe' }}
              checked={finalizado}
              onChange={(event) => orcamentoFinalizado(event.target.checked)}
              color='defaut'
            />

            <TextField
              style={{ flexGrow: 1, borderRadius: '4px', margin: '0 1em 0 0', background: '#fdfdfe', color: '#52616b' }}
              onChange={(event) => orcamentoTitle(event.target.value)}
              placeholder='Orçamento...'
              inputProps={{ style: { color: '#52616b' } }}
              variant='outlined'
              value={title}
            />
            { /*  <Button onClick={() => recursoNew()} style={{ width: '12,5%', margin: '0 1em 0 0', background: '#f0a500' }}><Add /> Recurso </Button>  */ }
            <Button onClick={() => despesaNew()} style={{ width: '25%', margin: '0 1em 0 0', background: '#f0a500' }}><Remove /> Despesa </Button> 
          </ListSubheader>

          <ListSubheader className='flex items-center pb2 pt2' >
            <Typography variant='button' display="inline" style={{ margin: '0 1em 0 0', color: '#fdfdfe' }}> PRV: </Typography>
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

            <Button onClick={() => orcamentoDel()} style={{ width: '25%', margin: '0 1em 0 0', background: '#f0a500' }}><Delete /> Orçamento</Button>
          </ListSubheader>

          <ListSubheader className='flex items-center pb2 pt2' >
            <Typography variant='button' display="inline" style={{ margin: '0 1em 0 0', color: '#fdfdfe' }}> SLD: </Typography>
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
            <Button onClick={() => orcamentoDisplay(-1)} style={{ width: '25%', margin: '0 1em 0 0', background: '#cf7500' }}><Close /> Fechar</Button>
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
              tipoValor={tipoValor}
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
          <Checkbox
            style={{ margin: '0 0.2em 0 0', color: '#fdfdfe' }}
            checked={finalizado}
            onChange={(event) => orcamentoFinalizado(event.target.checked)}
            color='defaut'
          />

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
          <Typography variant='button' display="inline" style={{ margin: '0 1em 0 0', color: '#fdfdfe' }}> PRV: </Typography>
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
          <Typography variant='button' display="inline" style={{ margin: '0 1em 0 0', color: '#fdfdfe' }}> SLD: </Typography>
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