import axios from 'axios';

import types from './types';

export const signIn = (dispatch, { email, password }) => {
  dispatch({ type: types.loaderShow });
  axios.post(`${process.env.REACT_APP_API}/api/accounts/sign-in`, { email, password })
    .then(({ data }) => {
      dispatch({ type: types.login, ...data, password });
      dispatch({ type: types.loaderHide });
    })
    .catch(_ => {
      dispatch({ type: types.logout });
      dispatch({ type: types.loaderHide });
      dispatch({ type: types.alertShow, alert: 'Erro ao entrar.' });
    });
};

export const signUp = (dispatch, { email, password, name }) => {
  dispatch({ type: types.loaderShow });
  axios.post(`${process.env.REACT_APP_API}/api/accounts/sign-up`, { email, password, name })
    .then(({ data }) => {
      dispatch({ type: types.login, ...data, password });
      dispatch({ type: types.loaderHide });
    })
    .catch(_ => {
      dispatch({ type: types.logout });
      dispatch({ type: types.loaderHide });
      dispatch({ type: types.alertShow, alert: 'Erro ao cadastrar.' });
    });
};

export const getUserData = (dispatch, { email }) => {
  dispatch({ type: types.loaderShow });
  axios.get(`${process.env.REACT_APP_API}/api/users/${email}`)
    .then(({ data }) => {
      dispatch({ type: types.init, data })
      dispatch({ type: types.loaderHide });;
    })
    .catch(_ => axios.post(`${process.env.REACT_APP_API}/api/users/${email}`)
      .then(({ data }) => {
        dispatch({ type: types.init, data });
        dispatch({ type: types.loaderHide });
      })
      .catch(_ => {
        dispatch({ type: types.logout });
        dispatch({ type: types.loaderHide });
        dispatch({ type: types.alertShow, alert: 'Erro ao buscar dados do usuário.' });
      }));
};

export const saveUserData = (dispatch, { email, orcamentos }) => {
  dispatch({ type: types.loaderShow });
  axios.patch(`${process.env.REACT_APP_API}/api/users/${email}`, { orcamentos })
    .then(({ data }) => {
      dispatch({ type: types.save, data });
      dispatch({ type: types.loaderHide });
    })
    .catch(_ => {
      dispatch({ type: types.logout });
      dispatch({ type: types.loaderHide });
      dispatch({ type: types.alertShow, alert: 'Erro ao salvar dados do usuário.' });
    });
};