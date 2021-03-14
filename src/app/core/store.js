import { createStore } from 'redux';

import { orcamentoNew, receitaNew, initState } from './states';
import types from './types';

export default createStore((state = initState, action) => {
  switch (action.type) {
    case types.login:
      const email = action.email, password = action.password;
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      return { ...state, email: action.email, password: action.password, name: action.name, authenticated: true };
    case types.logout:
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      return { ...state, email: '', password: '', name: '', orcamentos: [], authenticated: false };

    case types.init:
      return { ...state, ...action.data };
    case types.save:
      return { ...state, ...action.data };

    case types.loaderShow:
      return { ...state, loading: true };
    case types.loaderHide:
      return { ...state, loading: false };

    case types.alertShow:
      return { ...state, alert: { open: true, message: action.alert } };
    case types.alertHide:
      return { ...state, alert: { open: false, message: '' } };

    case types.signIn:
      return { ...state, login: true };
    case types.signUp:
      return { ...state, login: false };
    case types.email:
      return { ...state, email: action.email };
    case types.password:
      return { ...state, password: action.password };
    case types.name:
      return { ...state, name: action.name };

    case types.orcamentoDisplay:
      return { ...state, display: action.display };
    case types.orcamentoNew:
      return { ...state, orcamentos: [...state.orcamentos, orcamentoNew] };
    case types.orcamentoDel:
      return { ...state, orcamentos: state.orcamentos.filter((_, li) => li !== action.orcamento) };
    case types.orcamentoTitle:
      return { ...state, orcamentos: state.orcamentos.map((orcamento, li) => li === action.orcamento ? { ...orcamento, title: action.title } : orcamento) };
    case types.orcamentoValorPrevisto:
      return { ...state, orcamentos: state.orcamentos.map((orcamento, li) => li === action.orcamento ? { ...orcamento, valorPrevisto: action.valorPrevisto } : orcamento) };
    case types.orcamentoValorReal:
      return { ...state, orcamentos: state.orcamentos.map((orcamento, li) => li === action.orcamento ? { ...orcamento, valorReal: action.valorReal } : orcamento) };
    case types.orcamentoFinalizado:
      return { ...state, orcamentos: state.orcamentos.map((orcamento, li) => li === action.orcamento ? { ...orcamento, finalizado: action.finalizado } : orcamento) };

    case types.receitaNew:
      return { ...state, orcamentos: state.orcamentos.map((orcamento, li) => li === action.orcamento ? { ...orcamento, receitas: [...orcamento.receitas, receitaNew] } : orcamento) };
    case types.receitaDel:
      return { ...state, orcamentos: state.orcamentos.map((orcamento, li) => li === action.orcamento ? { ...orcamento, receitas: orcamento.receitas.filter((_, ti) => ti !== action.receita) } : orcamento) };
    case types.receitaDone:
      return { ...state, orcamentos: state.orcamentos.map((orcamento, li) => li === action.orcamento ? { ...orcamento, receitas: orcamento.receitas.map((receita, ti) => ti === action.receita ? { ...receita, done: action.done } : receita) } : orcamento) };
    case types.receitaDesc:
      return { ...state, orcamentos: state.orcamentos.map((orcamento, li) => li === action.orcamento ? { ...orcamento, receitas: orcamento.receitas.map((receita, ti) => ti === action.receita ? { ...receita, description: action.description } : receita) } : orcamento) };

    default:
      return { ...state };
  }
});