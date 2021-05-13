import GoogleAuth from 'google-auth-library';
import { Request } from 'express';

interface IBodyRequestForGoogleAuth extends Request {
  token: string;
}

export async function verify(
    req: Request
): Promise<GoogleAuth.TokenPayload | Error> {
    const client = new GoogleAuth.OAuth2Client(
        process.env.REACT_APP_GOOGLE_AUTH_API_CLIENTID
    );

    const requestWithType = req as IBodyRequestForGoogleAuth;

    try {
        const ticket = await client.verifyIdToken({
            idToken: `${requestWithType.token}`,
            audience: `${process.env.REACT_APP_GOOGLE_AUTH_API_CLIENTID}`,
        });

        const payload = ticket.getPayload();

        if (payload) {
            return payload;
        } else {
            return new Error('Error during getting Payload');
        }
    } catch (error) {
        return error;
    }
};
