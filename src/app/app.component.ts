import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Product-Management';
  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}
