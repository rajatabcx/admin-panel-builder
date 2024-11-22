import { ResponseType } from './constants';

export type ActionResponse = {
  type: ResponseType;
  message: string;
};
