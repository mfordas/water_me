import { GoogleApi } from './hooks';
import { AuthObject } from '../../Utils/generateAuthTokenForExternalUser';

export const makeAuth = async (
  authObject: GoogleApi | null,
  googleAction: (authObject: AuthObject) => void
): Promise<void | string | Error> => {
  if (authObject) {
    try {
      await authObject.signIn();
      await googleAction(authObject);
    } catch (err) {
      console.log(err);
      return err;
    }
  } else {
    return 'Google auth object not available';
  }
};