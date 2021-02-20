import { auth } from 'google-auth-library';
import { makeAuth } from '../helpers';

const mockedFunction = jest.fn();

describe('Should make log in action if auth object is availabe', () => {
  it('Should fire sign in method on auth object and login external function', async () => {
    const authObject = {
      signIn: () => Promise.resolve(mockedFunction()),
      currentUser: {
        get: () => {
          return {
            getAuthResponse: () => {
              return { id_token: '123456' };
            },
          };
        },
      },
    };

    await makeAuth(authObject, () => mockedFunction());

    expect(mockedFunction).toHaveBeenCalledTimes(2);
  });

  it('Should should return an error if auth object is null', async () => {
    const errorMessage = await makeAuth(null, () => mockedFunction());

    expect(mockedFunction).toHaveBeenCalledTimes(0);
    expect(errorMessage).toBe('Google auth object not available');
  });

  it('Log an error', async () => {
    const authObject = {
      signIn: () => Promise.reject(new Error('Test error')),
      currentUser: {
        get: () => {
          return {
            getAuthResponse: () => {
              return { id_token: '123456' };
            },
          };
        },
      },
    };

    const error = await makeAuth(authObject, () => mockedFunction());

    expect(mockedFunction).toHaveBeenCalledTimes(0);
    expect(error).toBeInstanceOf(Error);
  });
});
