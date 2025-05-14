export interface Products {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Products {
  quantity: number;
}
