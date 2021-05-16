export const initState = {
  authenticated: false,
  email: localStorage.getItem('email') || '',
  password: localStorage.getItem('password') || '',
  name: '',
  orcamentos: [],
  loading: false,
  display: -1,
  login: localStorage.getItem('email') && localStorage.getItem('password'),
  alert: { open: false, message: '' }
};

export const orcamentoNew = {
  title: '',
  valorPrevisto: 0,
  valorReal: 0,
  finalizado: false,
  despesas: [],
};

export const despesaNew = {
  description: '',
  valorDespesa: 0,
  done: false,
};