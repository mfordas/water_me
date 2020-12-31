const setHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-auth-token': localStorage.getItem('token'),
});

export default setHeaders;
