import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsState = signal<Product[]>([
    new Product(1, 'Laptop', 995, 'Electronics', true),
    new Product(2, 'T-Shirt', 14.12, 'Clothing', true),
    new Product(3, 'Book', 48.36, 'Books', false),
    new Product(4, 'TV', 15, 'Electronics', true),
    new Product(5, 'Facewash', 15, 'Beauty', true),
  ]);

  get products() {
    return this.productsState();
  }

  addProduct(product: Product) {
    this.productsState.update((products: Product[]) => [...products, product]);
  }
}
