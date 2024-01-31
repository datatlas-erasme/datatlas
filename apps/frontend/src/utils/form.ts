import { FieldValues, UseFormSetError } from 'react-hook-form';

export const handleServerError =
  <F extends FieldValues & { root?: { serverError?: Error } }>(setError: UseFormSetError<F>) =>
  (e: Error | string | unknown) => {
    if (typeof e === 'string') {
      // @ts-ignore
      setError('root.serverError', { message: e.toUpperCase() });
    } else if (e instanceof Error) {
      // @ts-ignore
      setError('root.serverError', e);
    } else {
      console.error('Something went wrong :', e);
    }
  };
