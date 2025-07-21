import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { AxiosService } from './axios';
import { PagedResponse } from '../../Interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Smartphone Galaxy S24',
      description: 'Smartphone premium com câmera de 108MP, tela AMOLED 6.8" e processador Snapdragon 8 Gen 3',
      price: 3999.99,
      image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'Eletrônicos'
    },
    {
      id: 2,
      name: 'Notebook Dell XPS 13',
      description: 'Ultrabook profissional com Intel Core i7, 16GB RAM, SSD 512GB e tela 13.3" 4K',
      price: 7999.99,
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'Computadores'
    },
    {
      id: 3,
      name: 'Fone de Ouvido Sony WH-1000XM5',
      description: 'Fone premium com cancelamento de ruído ativo, 30h de bateria e qualidade de áudio Hi-Res',
      price: 1299.99,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'Áudio'
    },
    {
      id: 4,
      name: 'Smart TV 65" QLED',
      description: 'TV 4K com tecnologia QLED, HDR10+, Dolby Vision e sistema operacional Tizen',
      price: 4599.99,
      image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'TVs'
    },
    {
      id: 5,
      name: 'Tablet iPad Pro 12.9"',
      description: 'Tablet profissional com chip M2, tela Liquid Retina XDR e compatibilidade com Apple Pencil',
      price: 6999.99,
      image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'Tablets'
    },
    {
      id: 6,
      name: 'Câmera DSLR Canon EOS R6',
      description: 'Câmera mirrorless full-frame com 20.1MP, vídeo 4K e estabilização de imagem',
      price: 8999.99,
      image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'Câmeras'
    }
  ];

  constructor(private axiosService: AxiosService) { }

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  products$ = this.productsSubject.asObservable();

  async getProductsPaged(page: number, size: number): Promise<PagedResponse<Product>> {
    return await this.axiosService.getAllPaged<Product>('/product', page, size);
  }

  async getProducts(): Promise<Product[]> {
    return await this.axiosService.getAll<Product>('/product');
  }

  async getProduct(id: number): Promise<Product | null> {
    return await this.axiosService.getById<Product>('/product', id);
  }

  searchProducts(query: string): Observable<Product[]> {
    if (!query.trim()) {
      return this.products$;
    }

    const filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );

    return new BehaviorSubject<Product[]>(filteredProducts).asObservable();
  }

  async createProduct(product: Product): Promise<boolean> {
    try {
      const response: { message: string } = await this.axiosService.post<{ message: string }>("/product", product);

      alert(response.message);

      return true;

    } catch (error) {
      alert(error)

      return false;
    }
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.productsSubject.next([...this.products]);
    }
  }

  deleteProduct(productId: number): void {
    this.products = this.products.filter(p => p.id !== productId);
    this.productsSubject.next([...this.products]);
  }
}