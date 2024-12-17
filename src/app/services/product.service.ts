import { Injectable, Signal, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private productsState = signal<Product[]>([
  //   new Product(1, 'Laptop', 995, 'Electronics', true),
  //   new Product(2, 'T-Shirt', 14.12, 'Clothing', true),
  //   new Product(3, 'Book', 48.36, 'Books', false),
  //   new Product(4, 'TV', 15, 'Electronics', true),
  //   new Product(5, 'Facewash', 15, 'Beauty', true),
  // ]);
  private productsState = signal<Product[]>([]);

  get products(): Signal<Product[]> {
    return this.productsState;
  }

  getProducts(): Product[] {
    return this.productsState();
  }

  addProduct(product: Product) {
    this.productsState.update((products) => [...products, product]);
  }

  deleteProduct(productId: number) {
    this.productsState.update((products) =>
      products.filter((product) => product.id !== productId)
    );
  }

  updateProduct(updatedProduct: Product) {
    this.productsState.update((products) =>
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  }

  toggleStock(productId: number) {
    this.productsState.update((products) =>
      products.map((product) =>
        product.id === productId
          ? { ...product, inStock: !product.inStock }
          : product
      )
    );
  }
}