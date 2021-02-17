import { GoogleApi } from './hooks';
import { AuthObject } from '../../Utils/generateAuthTokenForExternalUser';

export const makeAuth = async (
  authObject: GoogleApi | null,
  loginExternal: (authObject: AuthObject) => void
): Promise<void> => {
  if (authObject) {
    try {
      await authObject.signIn();
      await loginExternal(authObject);
    } catch (err) {
      console.log(err);
    }
  }
};
