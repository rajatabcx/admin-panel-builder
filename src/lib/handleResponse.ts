import { toast } from 'sonner';
import { ActionResponse } from './types';
import { ResponseType } from './constants';

export function handleResponse(response: ActionResponse): boolean {
  if (response.type === ResponseType.ERROR) {
    toast.error(response.message);
  } else if (response.type === ResponseType.INFO) {
    toast.info(response.message);
  } else {
    toast.success(response.message);
    return true;
  }
  return false;
}
