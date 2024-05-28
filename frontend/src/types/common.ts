import {AxiosError} from 'axios';
import {
  UseMutationOptions,
  UseQueryOptions,
  QueryKey,
} from '@tanstack/react-query';

export type ResponseError = AxiosError<{
  statusCode: string;
  message: string;
  error: string;
}>;

export type UseMutationCustomOptions<
  TData = unknown,
  TVariables = unknown,
> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, unknown>,
  'mutationFn'
>;

export type UseQueryCustomOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData,
> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  'queryKey'
>;
