import { User } from './user.interface';
import { SneakersItem } from './sneakers.interface';

export interface OrderItem {
  id: string,
  createdAt: string,
  name: User['name'],
  email: User['email'],
  clientId: User['id'],
  items: SneakersItem[],
}
