const generateAuthTokenForExternalUser = (authObject) => {
  return authObject.currentUser.get().getAuthResponse().id_token;
};

export default generateAuthTokenForExternalUser;
