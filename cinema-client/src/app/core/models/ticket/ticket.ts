import { Screening } from '../screening/screening';
import { User } from '../user/user';

export interface Ticket {
  id?: number;
  row?: number;
  column?: number;
  screening?: Screening;
  user?: User;
}
