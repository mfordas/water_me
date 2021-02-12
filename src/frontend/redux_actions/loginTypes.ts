export const loginExternalType = 'loginExternal';
export const logoutType = 'logout';

export interface LoginState {
  loginData: {
    name: string;
    googleId: string;
    invalidData: boolean;
  };
  isLogged: boolean;
}

interface LoginExternalAction extends LoginState {
  type: typeof loginExternalType;
}

interface LogoutAction extends LoginState {
  type: typeof logoutType;
}

export type LoginActionsType = LoginExternalAction | LogoutAction;
