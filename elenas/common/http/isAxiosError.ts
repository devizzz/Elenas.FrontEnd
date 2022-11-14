import { AxiosError } from 'axios';

const isAxiosError = (error: unknown): error is AxiosError => (error as AxiosError).isAxiosError !== undefined;

export default isAxiosError;
