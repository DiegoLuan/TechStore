import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { AxiosService } from '../../services/axios';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '/product-form.component.html',
  styleUrls: ['/product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
  ) {
    this.productForm = this.createForm();
  }

  ngOnInit(): void { }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      image: ['', [Validators.required, Validators.minLength(1)]],
      type: ['', [Validators.required]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.invalid) {
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    try {
      const formValue = this.productForm.value;

      const newProduct: Product = {
        name: formValue.name,
        description: formValue.description,
        price: Number(formValue.price),
        image: formValue.image,
        type: formValue.type
      };

      const isCreated = await this.productService.createProduct(newProduct);

      if (isCreated) {
        this.resetForm();
      }

    } catch (error) {
      console.error("Erro ao criar produto:", error);
    } finally {
      this.isSubmitting = false;
    }
  }

  resetForm(): void {
    this.productForm.reset();
    Object.keys(this.productForm.controls).forEach(key => {
      this.productForm.get(key)?.setErrors(null);
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}