import { GoogleApi } from './hooks';
import { AuthObject } from '../../Utils/generateAuthTokenForExternalUser';

export const makeAuth = async (
  authObject: GoogleApi | null,
  googleAction: (authObject: AuthObject) => Promise<void>
): Promise<void | string | Error> => {
  if (authObject) {
    try {
      await authObject.signIn();
      console.log(authObject);
      await googleAction(authObject);
      console.log('works2');
    } catch (err) {
      console.log('works3');
      console.log(err);
      return err;
    }
  } else {
    return 'Google auth object not available';
  }
};
