import { useEffect, useState } from 'react';

import { AuthObject } from '../../Utils/generateAuthTokenForExternalUser';

export interface GoogleApi extends AuthObject {
  signIn: () => Promise<void>;
};

declare const gapi: any;

export const useHandleGoogleApi = () => {
    const [authObject, setAuthObject] = useState<GoogleApi | null>(null);

    useEffect(() => {
        try {
            gapi.load('client:auth2', () => {
                gapi.client
                    .init({
                        clientId: process.env.REACT_APP_GOOGLE_AUTH_API_CLIENTID,
                        scope: 'email',
                    })
                    .then(async () => {
                        setAuthObject(await gapi.auth2.getAuthInstance());
                    });
            });
        } catch (err) {
            console.error(err);
        }
    }, []);

    return authObject;
};
