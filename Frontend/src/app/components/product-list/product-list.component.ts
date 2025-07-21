import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: '/product-list.component.html',
  styleUrls: ['/product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.products = await this.productService.getProducts();

    console.log("products", this.products);
  }

  // onSearch(): void {
  //   this.products$ = this.productService.searchProducts(this.searchTerm);
  // }

  viewProduct(productId: number | undefined): void {
    if (!productId) return;
    this.router.navigate(['/product', productId]);
  }

  addProduct(): void {
    this.router.navigate(['/add-product']);
  }
}