export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerInitials: string;
  customerColor: string;
  date: string;
  status: OrderStatus;
  amount: number;
}
