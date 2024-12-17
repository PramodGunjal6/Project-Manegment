import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  selectedCategory: string = '';
  productsSignal;
  products: Product[]=[];

  constructor(private productService: ProductService) {
    this.productsSignal = this.productService.products;
  }

  addProduct(product: Product) {
    this.products.push(product);
  }
  

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId);
  }

  toggleStock(productId: number) {
    this.productService.toggleStock(productId);
  }

  updateProduct(productId: number) {
    const product = this.productService
      .getProducts()
      .find((p) => p.id === productId);

    if (product) {
      const updatedName = prompt('Enter new product name:', product.name);
      const updatedPrice = prompt(
        'Enter new product price:',
        product.price.toString()
      );
      const updatedCategory = prompt(
        'Enter new product category:',
        product.category
      );

      if (updatedName && updatedPrice && updatedCategory) {
        const updatedProduct = {
          ...product,
          name: updatedName,
          price: parseFloat(updatedPrice),
          category: updatedCategory,
        };
        this.productService.updateProduct(updatedProduct);
      }
    }
  }

  filterProducts() {
    return this.selectedCategory
      ? this.productsSignal().filter(
          (product) => product.category === this.selectedCategory
        )
      : this.productsSignal();
  }
}
