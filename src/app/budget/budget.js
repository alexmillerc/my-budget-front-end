import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, useMediaQuery, useTheme } from '@material-ui/core';

import Nav from '../shared/nav';
import BudgetOrcamento from './orcamento';
import BudgetResume from './resume';
import { getUserData } from '../core/actions';
import types from '../core/types';

export default ({ email, name }) => {
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

  useEffect(() => {
    getUserData(dispatch, { email });
  }, [dispatch, email]);

  const { display, orcamentos } = useSelector(s => s);

  const orcamentoDisplay = (display) => {
    dispatch({ type: types.orcamentoDisplay, display });
  };

  return (
    <>
      <Nav email={email} name={name} orcamentos={orcamentos} />
      <div className='pa4' style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {!!orcamentos &&
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gridGap: '1rem', alignItems: 'baseline' }}>
            {orcamentos.map((orcamento, index) => <div key={index}>
              <BudgetResume
                key={index}
                orcamento={index}
                title={orcamento.title}
                receitas={orcamento.receitas}
              />
              <Dialog open={index === display} onClose={() => orcamentoDisplay(-1)} fullScreen={fullScreen} fullWidth={true} maxWidth={'md'}>
                <BudgetOrcamento
                  key={index}
                  orcamento={display}
                  title={orcamento.title}
                  receitas={orcamento.receitas}
                />
              </Dialog>
            </div>)}
          </div>
        }
      </div>
    </>
  );
};