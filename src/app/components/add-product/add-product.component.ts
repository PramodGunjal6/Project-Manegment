import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-product',
  imports: [CommonModule, FormsModule,],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  @Output() productAdded = new EventEmitter<Product>();
  product: Product = new Product(0, '', 0, '', true);

  constructor(private productService: ProductService) {}

  addProduct() {
    if (this.product.name && this.product.price && this.product.category) {
      const newProduct = new Product(
        Date.now(),
        this.product.name,
        this.product.price,
        this.product.category,
        this.product.inStock
      );
      this.productService.addProduct(newProduct);
      this.productAdded.emit(newProduct);
      this.product = new Product(0, '', 0, '', true);
      alert('Product added successfully!');
    } else {
      alert('Please fill all required fields');
    }
  }
}
