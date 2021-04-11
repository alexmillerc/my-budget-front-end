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

      var newError = ''

      if (err.message === "Request failed with status code 400") {
        newError = "Email invalid (400)"
      };
      if (err.message === "Request failed with status code 404") {
        newError = "Not found (404)"
      };
      if (err.message === "Request failed with status code 401") {
        newError = "Unauthorized (401)"
      };
      if (err.message === "Request failed with status code 500") {
        newError = "Internal server error (500)"
      };

      dispatch({ type: types.logout });
      dispatch({ type: types.loaderHide });
      dispatch({ type: types.alertShow, alert: `Erro ao entrar - ${newError}` });

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

      var newError = ''

      if (err.message === "Request failed with status code 400") {
        newError = "Email invalid (400)"
      };
      if (err.message === "Request failed with status code 404") {
        newError = "Not found (404)"
      };
      if (err.message === "Request failed with status code 401") {
        newError = "Unauthorized (401)"
      };
      if (err.message === "Request failed with status code 409") {
        newError = "Conflict (409)"
      };
      if (err.message === "Request failed with status code 500") {
        newError = "Internal server error (500)"
      };

      dispatch({ type: types.logout });
      dispatch({ type: types.loaderHide });
      dispatch({ type: types.alertShow, alert: `Erro ao cadastrar - ${newError}` });
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

      var newError = ''

      if (err.message === "Request failed with status code 400") {
        newError = "Email invalid (400)"
      };
      if (err.message === "Request failed with status code 404") {
        newError = "Not found (404)"
      };
      if (err.message === "Request failed with status code 500") {
        newError = "Internal server error (500)"
      };

        dispatch({ type: types.logout });
        dispatch({ type: types.loaderHide });
        dispatch({ type: types.alertShow, alert: `Erro ao buscar dados do usuário - ${newError}` });
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

      var newError = ''

      if (err.message === "Request failed with status code 400") {
        newError = "Email invalid (400)"
      };
      if (err.message === "Request failed with status code 404") {
        newError = "Not found (404)"
      };
      if (err.message === "Request failed with status code 500") {
        newError = "Internal server error (500)"
      };

      dispatch({ type: types.logout });
      dispatch({ type: types.loaderHide });
      dispatch({ type: types.alertShow, alert: `Erro ao salvar dados do usuário - ${newError}` });
    });
};