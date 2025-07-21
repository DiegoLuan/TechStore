import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '/product-detail.component.html',
  styleUrls: ['/product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  async ngOnInit(): Promise<void> {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(productId)) {
      this.product = await this.productService.getProduct(productId);
    }

    this.loading = false;
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      // Você pode adicionar um toast ou notificação aqui
      alert('Produto adicionado ao carrinho!');
    }
  }

  viewCart(): void {
    this.router.navigate(['/cart']);
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}