export type Headers = {
  Accept: string;
  'Content-Type': string;
  'x-auth-token': string | null;
};

export const setHeaders = (): Headers => ({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('token'),
});
