import { ResponseType } from './constants';

export type ActionResponse = {
  type: ResponseType;
  message: string;
};

export interface NLQUpdateEvent {
  kind: 'UPDATE';
  status: string;
}
export interface NLQResponseEvent {
  kind: 'RESPONSE';
  type: 'TEXT' | 'TABLE';
  payload: string | Array<Record<string, any>>;
}
