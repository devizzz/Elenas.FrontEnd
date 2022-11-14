import isAxiosError from '@common/http/isAxiosError';

const getErrorCode = (error: unknown): number | null => {
  if (isAxiosError(error) && error.response?.status) {
    return error.response.status;
  }

  return null;
};

export default getErrorCode;
