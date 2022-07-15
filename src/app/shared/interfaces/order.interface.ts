export interface OrderDetail {
  productId: number;
  productName: string;
  quantity: number;
  orderId: number;
}

export interface Order {
  id: number;
  name: string;
  shippingAddress: string;
  city: string;
  pickup: boolean;
  store: string;
  details: OrderDetail[];
}
