import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: Product[] = [];
  selectedCategory: string = '';

  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.products = this.productService.products;
  }

  deleteProduct(productId: number) {
    const productIndex = this.products.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
      const deletedProduct = this.products.splice(productIndex, 1);
      alert(`Product deleted: ${deletedProduct[0].name}`);
    }
  }

  toggleStock(productId: number) {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      product.inStock = !product.inStock;
      alert(
        `Product stock status changed: ${product.name} is now ${
          product.inStock ? 'In Stock' : 'Out of Stock'
        }`
      );
    }
  }
  updateProduct(productId: number) {
    const product = this.products.find((p) => p.id === productId);
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
        product.name = updatedName;
        product.price = parseFloat(updatedPrice);
        product.category = updatedCategory;

        alert(`Product updated: ${product.name}`);
      }
    }
  }

  filterProducts() {
    return this.selectedCategory
      ? this.products.filter(
          (product) => product.category === this.selectedCategory
        )
      : this.products;
  }
}
