import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Divider, TextField, Typography, ListSubheader, InputAdornment } from '@material-ui/core';
import { Delete, Remove, Add } from '@material-ui/icons';

import types from '../core/types';

var salvaDespesa = 0;
var indexDespesa = 0;
var indexOrcamento = 0;
var setTipoValor = 0;

export default ({ orcamento, despesa, description, valorDespesa, finalizado, valorPrevisto, valorReal, done, tipoValor }) => {
  const dispatch = useDispatch();

  if (setTipoValor == 0) {
    setTipoValor = 1
    done = tipoValor
  }

  const despesaDel = () => {
    dispatch({ type: types.despesaDel, orcamento, despesa });
  };

  const despesaDesc = (description) => {
    dispatch({ type: types.despesaDesc, orcamento, despesa, description });
  };

  if (valorDespesa === 0) {
    valorDespesa = ''
  };

  const despesaValorDespesa = (valorDespesa) => {
    dispatch({ type: types.despesaDone, orcamento, despesa, done })
    dispatch({ type: types.despesaValorDespesa, orcamento, despesa, valorDespesa });
  };

  const setDespesa = () => {

    if (valorDespesa == '') {
      done = tipoValor
    }

    /* verifica qual o index do orçamento */
    if (indexOrcamento != orcamento) {
      indexOrcamento = orcamento
      salvaDespesa = 0
      setTipoValor = 0

      /* verifica se campo já tem despesa */
      if (valorDespesa != 0) {
        salvaDespesa = valorDespesa
      }

      /* verifica qual o index da despesa */
    } else if (indexDespesa != despesa) {
      indexDespesa = despesa
      salvaDespesa = 0
      setTipoValor = 0

      /* verifica se campo já tem despesa */
      if (valorDespesa != 0) {
        salvaDespesa = valorDespesa
      }
    }
  }

  const orcamentoValorReal = (valorDespesa) => {

    /* verifica se os campos valorReal e valorDespesa tem valor válido */
    if (valorReal == '') {
      valorReal = 0
    }
    if (valorDespesa == '') {
      valorDespesa = 0
    }

    /* verifica se o valor da despesa mudou */
    if (salvaDespesa != valorDespesa && salvaDespesa != 0) {
      console.log("if")
      console.log(valorReal)
      let novaDespesa = Number(valorDespesa) - Number(salvaDespesa)
      valorReal = Number(valorReal) - Number(novaDespesa)

      console.log(valorDespesa)
      console.log(salvaDespesa)
      console.log(novaDespesa)
      console.log(valorReal)

      /* calcula despesa pela primeira vez */
    } else {
      valorReal = Number(valorReal) - Number(valorDespesa)
      console.log("else")
      console.log(valorDespesa)
      console.log(valorReal)
    }

    /* salva despesa atual na memoria */
    salvaDespesa = valorDespesa

    dispatch({ type: types.orcamentoValorReal, orcamento, valorReal });
  };


  const orcamentoValorRealDel = () => {

    if (indexDespesa != despesa) {
      indexDespesa = despesa
      salvaDespesa = 0

      /* verifica se campo já tem despesa */
      if (valorDespesa != 0) {
        salvaDespesa = valorDespesa
      }
    }

    /* deleta despesa e adiciona o valor ao saldo */
    valorReal = Number(valorReal) + Number(valorDespesa)
    salvaDespesa = 0
    setTipoValor = 0

    dispatch({ type: types.orcamentoValorReal, orcamento, valorReal });
  };


  if (finalizado === false && done === false) {
    return (
      <>
        <Divider style={{ background: "#c9d6df" }} />

        <ListSubheader className='flex items-center pb2 pt2' style={{ background: '#fdfdfe' }}>

          <Typography variant='button' display="inline" style={{ margin: '0 1em 0 0', color: '#52616b' }}> <Remove style={{ color: '#cf7500' }}/> </Typography>
          <TextField
            style={{ flexGrow: 1, color: '#52616b' }}
            display="inline"
            fullWidth
            placeholder='Descrição...'
            inputProps={{ style: { color: '#52616b' } }}
            value={description}
            onChange={(event) => despesaDesc(event.target.value)}
          />
          <span>&nbsp;&nbsp;&nbsp;</span>
          <TextField
            style={{ flexGrow: 1, borderRadius: '4px', margin: '0 1em 0 0', background: '#fdfdfe', color: '#52616b' }}
            display="inline"
            onClick={() => (setDespesa())}
            onChange={(event) => (despesaValorDespesa(event.target.value), orcamentoValorReal(event.target.value))}
            placeholder='Valor...'
            InputProps={{
              startAdornment: <InputAdornment position="start">R$:</InputAdornment>, style: { color: '#52616b' }, inputProps: { min: "0.00", step: "0.01" }
            }}
            type="number"
            value={valorDespesa}
          />

          <Button onClick={() => (despesaDel(), orcamentoValorRealDel())} style={{ width: '10%', margin: '0 1em 0 0', background: '#fdfdfe' }}><Delete style={{ color: '#cf7500' }} /></Button>
        </ListSubheader>

      </>
    );
  };

if  (finalizado === false && done === true) {
  return (
    <>
      <Divider style={{ background: "#c9d6df" }} />

      <ListSubheader className='flex items-center pb2 pt2' style={{ background: '#fdfdfe' }}>

        <Typography variant='button' display="inline" style={{ margin: '0 1em 0 0', color: '#52616b' }}> <Add style={{ color: '#78866b' }}/> </Typography>
        <TextField
          style={{ flexGrow: 1, color: '#52616b' }}
          display="inline"
          fullWidth
          placeholder='Descrição...'
          inputProps={{ style: { color: '#52616b' } }}
          value={description}
          onChange={(event) => despesaDesc(event.target.value)}
        />
        <span>&nbsp;&nbsp;&nbsp;</span>
        <TextField
          style={{ flexGrow: 1, borderRadius: '4px', margin: '0 1em 0 0', background: '#fdfdfe', color: '#52616b' }}
          display="inline"
          onClick={() => (setDespesa())}
          onChange={(event) => (despesaValorDespesa(event.target.value), orcamentoValorReal(event.target.value))}
          placeholder='Valor...'
          InputProps={{
            startAdornment: <InputAdornment position="start">R$:</InputAdornment>, style: { color: '#52616b' }, inputProps: { min: "0.00", step: "0.01" }
          }}
          type="number"
          value={valorDespesa}
        />

        <Button onClick={() => (despesaDel(), orcamentoValorRealDel())} style={{ width: '10%', margin: '0 1em 0 0', background: '#fdfdfe' }}><Delete style={{ color: '#cf7500' }} /></Button>
      </ListSubheader>

    </>
  );
};

  return (
    <>
      <Divider style={{ background: "#c9d6df" }} />

      <ListSubheader className='flex items-center pb2 pt2' style={{ background: '#fdfdfe' }}>

        <Typography variant='button' display="inline" style={{ margin: '0 1em 0 0', color: '#52616b' }}> DSP: </Typography>
        <TextField
          disabled
          style={{ flexGrow: 1, color: '#52616b' }}
          display="inline"
          fullWidth
          placeholder='Descrição...'
          inputProps={{ style: { color: '#52616b' } }}
          value={description}
          onChange={(event) => despesaDesc(event.target.value)}
        />
        <span>&nbsp;&nbsp;&nbsp;</span>
        <TextField
          disabled
          style={{ flexGrow: 1, borderRadius: '4px', margin: '0 1em 0 0', background: '#fdfdfe', color: '#52616b' }}
          display="inline"
          onChange={(event) => despesaValorDespesa(event.target.value)}
          placeholder='Valor...'
          InputProps={{
            startAdornment: <InputAdornment position="start">R$:</InputAdornment>, style: { color: '#52616b' }, inputProps: { min: "0.00", step: "0.01" }
          }}
          type="number"
          value={valorDespesa}
        />
      </ListSubheader>

    </>
  );
};