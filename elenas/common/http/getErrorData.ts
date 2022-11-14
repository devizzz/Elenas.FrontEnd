import isAxiosError from '@common/http/isAxiosError';

type HttpErrorData = {
  detail?: string;
  status?: number;
  title?: string;
  type?: string;
};

const getErrorData = (error: unknown): HttpErrorData | null => {
  if (isAxiosError(error) && error.response && error.response.data) {
    return error.response.data as HttpErrorData;
  }

  return null;
};

export default getErrorData;
