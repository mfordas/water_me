import GoogleAuth from 'google-auth-library';
import { Request } from 'express';

interface IBodyRequestForGoogleAuth extends Request {
  token: string;
}

export default async function verify(
  req: IBodyRequestForGoogleAuth
): Promise<GoogleAuth.TokenPayload | string> {
  const client = new GoogleAuth.OAuth2Client(
    process.env.REACT_APP_GOOGLE_AUTH_API_CLIENTID
  );
  try {
    const ticket = await client.verifyIdToken({
      idToken: `${req.token}`,
      audience: `${process.env.REACT_APP_GOOGLE_AUTH_API_CLIENTID}`,
    });

    const payload = ticket.getPayload();

    if (payload) {
      return payload;
    } else {
      return 'Error during getting Payload';
    }
  } catch (error) {
    return error;
  }
}
