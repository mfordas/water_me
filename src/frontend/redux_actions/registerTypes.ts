export const registerExternal = 'registerExternal';
export const resetRegState = 'resetRegisterState';

export interface RegisterState {
  invalidData: boolean;
  confirm: boolean;
  googleUser: boolean;
}

interface RegisterExternalAction extends RegisterState {
  type: typeof registerExternal;
}

interface ResetRegisterStateAction extends RegisterState {
  type: typeof resetRegState;
}

export type RegisterActionsType =
  | RegisterExternalAction
  | ResetRegisterStateAction;
