export const AUTH_TOKEN = 'auth-token';
export const saveToken = token => {
  localStorage.setItem(AUTH_TOKEN, token);
};
export const isAuth = () => {
  if (localStorage.getItem(AUTH_TOKEN)) {
    return true;
  }
  return false;
};
export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};
