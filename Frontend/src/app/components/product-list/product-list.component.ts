import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: '/product-list.component.html',
  styleUrls: ['/product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  totalPages = 1;
  currentPage = 1;
  pageSize = 5;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadProducts(this.currentPage);
  }

  async loadProducts(page: number) {
    try {
      const response = await this.productService.getProductsPaged(page, this.pageSize);
      this.products = response.data;
      this.totalPages = response.totalPages;
      this.currentPage = response.page;
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  }

  onPageChange(page: number) {
    this.loadProducts(page);
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