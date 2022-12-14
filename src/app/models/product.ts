export interface IProduct {
  id: string;
  imgUrl: string[];
  price: number;
  discount: number;
  main: boolean;
  shop: string;
  name: string;
  description: string;
  shipping: string | null;
  discountUntil: string;
  new: boolean;
  color: string[];
  size: string[];
  review: { author: string; text: string; rating: number }[];
}
