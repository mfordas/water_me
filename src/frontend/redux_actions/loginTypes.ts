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

export interface LoginExternalAction extends LoginState {
  type: typeof loginExternalType;
}

export interface LogoutAction extends LoginState {
  type: typeof logoutType;
}

export type LoginActionsType = LoginExternalAction | LogoutAction;
