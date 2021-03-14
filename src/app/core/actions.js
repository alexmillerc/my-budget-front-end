import axios from 'axios';

import types from './types';

export const signIn = (dispatch, { email, password }) => {
  dispatch({ type: types.loaderShow });
  axios.post(`${process.env.REACT_APP_API}/api/v1/accounts/sign-in`, { email, password })
    .then(({ data }) => {
      dispatch({ type: types.login, ...data, password });
      dispatch({ type: types.loaderHide });
    })
    .catch((err) => {
      dispatch({ type: types.logout });
      dispatch({ type: types.loaderHide });
      dispatch({ type: types.alertShow, alert: `Erro ao entrar - ${err.message}` });
      console.log(err)
    });
};


export const signUp = (dispatch, { email, password, name }) => {
  dispatch({ type: types.loaderShow });
  axios.post(`${process.env.REACT_APP_API}/api/v1/accounts/sign-up`, { email, password, name })
    .then(({ data }) => {
      dispatch({ type: types.login, ...data, password });
      dispatch({ type: types.loaderHide });
    })
    .catch((err) => {
      dispatch({ type: types.logout });
      dispatch({ type: types.loaderHide });
      dispatch({ type: types.alertShow, alert: `Erro ao cadastrar - ${err.message}` });
    });
};

export const getUserData = (dispatch, { email }) => {
  dispatch({ type: types.loaderShow });
  axios.get(`${process.env.REACT_APP_API}/api/v1/users/${email}`)
    .then(({ data }) => {
      dispatch({ type: types.init, data })
      dispatch({ type: types.loaderHide });;
    })
    .catch(_ => axios.post(`${process.env.REACT_APP_API}/api/v1/users/${email}`)
      .then(({ data }) => {
        dispatch({ type: types.init, data });
        dispatch({ type: types.loaderHide });
      })
      .catch((err) => {
        dispatch({ type: types.logout });
        dispatch({ type: types.loaderHide });
        dispatch({ type: types.alertShow, alert: `Erro ao buscar dados do usuário - ${err.message}` });
      }));
};

export const saveUserData = (dispatch, { email, orcamentos }) => {
  dispatch({ type: types.loaderShow });
  axios.patch(`${process.env.REACT_APP_API}/api/v1/users/${email}`, { orcamentos })
    .then(({ data }) => {
      dispatch({ type: types.save, data });
      dispatch({ type: types.loaderHide });
    })
    .catch((err) => {
      dispatch({ type: types.logout });
      dispatch({ type: types.loaderHide });
      dispatch({ type: types.alertShow, alert: `Erro ao salvar dados do usuário - ${err.message}` });
    });
};