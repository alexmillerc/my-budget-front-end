import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Divider, TextField, ListSubheader, InputAdornment, Switch, Tooltip } from '@material-ui/core';
import { Delete, Remove, Add } from '@material-ui/icons';

import types from '../core/types';

var salvaDespesa = 0;
var indexDespesa = 0;
var indexOrcamento = 0;

export default ({ orcamento, despesa, description, valorDespesa, finalizado, valorReal, done }) => {
  const dispatch = useDispatch();

  const despesaRecurso = (done) => {
    dispatch({ type: types.despesaDone, orcamento, despesa, done });

    /* verifica se o valor é orçamento/recurso */
    if (done === false) {
      valorReal = Number(valorReal) - (Number(valorDespesa) * 2);
    } else {
      valorReal = Number(valorReal) + (Number(valorDespesa) * 2);
    }

    dispatch({ type: types.orcamentoValorReal, orcamento, valorReal });
  };

  const despesaDel = () => {
    dispatch({ type: types.despesaDel, orcamento, despesa });
  };

  const despesaDesc = (description) => {
    dispatch({ type: types.despesaDesc, orcamento, despesa, description });
  };

  if (valorDespesa === 0) {
    valorDespesa = '';
  };

  const despesaValorDespesa = (valorDespesa) => {
    dispatch({ type: types.despesaDone, orcamento, despesa, done });
    dispatch({ type: types.despesaValorDespesa, orcamento, despesa, valorDespesa });
  };

  const setDespesa = () => {

    /* Inicializa primeira despesa/recurso */
    if (despesa === 0) {
      indexDespesa = 0;
      salvaDespesa = 0;
    }

    /* verifica qual o index do orçamento/recurso */
    if (indexOrcamento !== orcamento) {
      indexOrcamento = orcamento;
      salvaDespesa = 0;

      /* verifica se campo já tem despesa/recurso */
      if (valorDespesa !== 0) {
        salvaDespesa = valorDespesa;
      }

      /* verifica qual o index da despesa/recurso */
    } else if (indexDespesa !== despesa) {
      indexDespesa = despesa;
      salvaDespesa = 0;

      /* verifica se campo já tem despesa/recurso */
      if (valorDespesa !== 0) {
        salvaDespesa = valorDespesa;
      }
    }
  }

  const orcamentoValorReal = (valorDespesa) => {

    /* verifica se os campos valorReal e valorDespesa tem valor válido */
    if (valorReal === '') {
      valorReal = 0;
    }
    if (valorDespesa === '') {
      valorDespesa = 0;
    }

    if (done === false) {
      /* verifica se o valor da despesa mudou */
      if (salvaDespesa !== valorDespesa && salvaDespesa !== 0) {   
        let novaDespesa = Number(valorDespesa) - Number(salvaDespesa);
        valorReal = Number(valorReal) - Number(novaDespesa);

        /* calcula despesa pela primeira vez */
      } else {
        valorReal = Number(valorReal) - Number(valorDespesa);
      }

    } else {
      /* verifica se o valor do recurso mudou */
      if (salvaDespesa !== valorDespesa && salvaDespesa !== 0) {
        let novaDespesa = Number(valorDespesa) - Number(salvaDespesa);
        valorReal = Number(valorReal) + Number(novaDespesa);

        /* calcula recurso pela primeira vez */
      } else {
        valorReal = Number(valorReal) + Number(valorDespesa);
      }
    }

    /* salva despesa/recurso atual na memoria */
    salvaDespesa = valorDespesa;

    dispatch({ type: types.orcamentoValorReal, orcamento, valorReal });
  };

  const orcamentoValorRealDel = () => {

    if (indexDespesa !== despesa) {
      indexDespesa = despesa;
      salvaDespesa = 0;


      /* verifica se campo já tem despesa/recurso */
      if (valorDespesa !== 0) {
        salvaDespesa = valorDespesa;
      }
    }

    if (done === false) {
      /* deleta despesa e adiciona o valor ao saldo */
      valorReal = Number(valorReal) + Number(valorDespesa);
      /*salvaDespesa = 0 */
    } else {
      /* deleta recurso e adiciona o valor ao saldo */
      valorReal = Number(valorReal) - Number(valorDespesa);
      /*salvaDespesa = 0 */
    }

    dispatch({ type: types.orcamentoValorReal, orcamento, valorReal });
  };


  if (finalizado === false) {
    return (
      <>
        <Divider style={{ background: "#c9d6df" }} />

        <ListSubheader className='flex items-center pb2 pt2' style={{ background: '#fdfdfe' }}>

          <Tooltip title="Tipo de Valor">
            <Switch
              style={{ color: '#c9d6df' }}
              checked={done}
              onChange={(event) => despesaRecurso(event.target.checked)}
              color='default'
            />
          </Tooltip>

          {(() => {
            if (done === false) {
              return (
                <Tooltip title="Despesa">
                  <Remove style={{ color: '#cf7500' }} />
                </Tooltip>
              )
            } else {
              return (
                <Tooltip title="Recurso">
                  <Add style={{ color: '#52616b' }} />
                </Tooltip>
              )
            }
          })()}

          <span>&nbsp;</span>
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

          <Tooltip title="Excluir">
            <Button onClick={() => (despesaDel(), orcamentoValorRealDel())} style={{ width: '10%', margin: '0 1em 0 0', background: '#fdfdfe' }}><Delete style={{ color: '#cf7500' }} /></Button>
          </Tooltip>
        </ListSubheader>

      </>
    );
  };

  if (finalizado === true) {
    return (
      <>
        <Divider style={{ background: "#c9d6df" }} />

        <ListSubheader className='flex items-center pb2 pt2' style={{ background: '#fdfdfe' }}>

          {(() => {
            if (done === false) {
              return (
                <Tooltip title="Despesa">
                  <Remove style={{ color: '#cf7500' }} />
                </Tooltip>
              )
            } else {
              return (
                <Tooltip title="Recurso">
                  <Add style={{ color: '#52616b' }} />
                </Tooltip>
              )
            }
          })()}

          <span>&nbsp;</span>
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


};