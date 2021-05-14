export type AuthObject = {
  currentUser: {
    get: () => {
      getAuthResponse: () => {
        id_token: string;
      };
    };
  };
};

export const generateAuthTokenForExternalUser = async (
    authObject: AuthObject
): Promise<string> => {
    return await authObject.currentUser.get().getAuthResponse().id_token;
};
