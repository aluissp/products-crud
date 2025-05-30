import { Expose } from 'class-transformer';

export class Product {
  @Expose()
  id: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
