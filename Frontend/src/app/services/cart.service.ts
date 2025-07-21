import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Product } from '../models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  public cartItems$ = this.cartItemsSubject.asObservable();
  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }

    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(productId: number | undefined): void {
    if (!productId) return;
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.cartSubject.next([...this.cartItems]);
  }

  updateQuantity(productId: number | undefined, quantity: number): void {
    if (!productId) return;
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.cartSubject.next([...this.cartItems]);
      }
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cart$;
  }

  getTotalPrice(): Observable<number> {
    return new BehaviorSubject<number>(
      this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    ).asObservable();
  }

  getCartItemCount(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + item.quantity, 0))
    );
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next([...this.cartItems]);
  }
}