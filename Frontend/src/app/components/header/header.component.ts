import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: '/header.component.html',
  styleUrls: ['/header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItemCount$: Observable<number> = new Observable();

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartItemCount$ = this.cartService.getCartItemCount();
  }

  goHome(): void {
    this.router.navigate(['/products']);
  }
}