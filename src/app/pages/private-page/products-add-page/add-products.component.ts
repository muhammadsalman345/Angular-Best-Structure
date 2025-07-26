import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

export enum ProductType {
  Online = 'online',
  Offline = 'offline',
  Both = 'both'
}

export enum SupplierPaymentStatus {
  Paid = 'paid',
  Unpaid = 'unpaid',
  Partial = 'partial'
}

@Component({
  selector: 'app-addproduct',
   standalone: true, // <-- Add this
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './add-products.component.html',
  
})
export class AppAddProductPageComponent {
  uploadedImages: File[] = [];
imagePreviews: string[] = [];
  productForm: FormGroup;
  productTypes = Object.values(ProductType);
  paymentStatuses = Object.values(SupplierPaymentStatus);

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      barcode: [''],
      purchasePrice: [0, [Validators.required, Validators.min(0)]],
      salePrice: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unit: ['pcs', Validators.required],
      productType: [ProductType.Offline, Validators.required],
      purchaseDate: [new Date(), Validators.required],
      supplier: [''],
      supplierPaymentStatus: [SupplierPaymentStatus.Unpaid],
      amountPaidToSupplier: [0],
      stockAlertLimit: [0],
      imageUrl: [''],
      description: ['']
    });
  }
onImageSelected(event: Event): void {
  const files = (event.target as HTMLInputElement)?.files;
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.uploadedImages.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
}

removeImage(index: number): void {
  this.uploadedImages.splice(index, 1);
  this.imagePreviews.splice(index, 1);
}
  submitForm(): void {
  if (this.productForm.valid) {
    const productData = this.productForm.value;

    // ⬇️ Combine form data and images
    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) =>
      formData.append(key, value as any)
    );

    this.uploadedImages.forEach((file, index) => {
      formData.append('images', file); // multiple file support
    });

    console.log('📦 Form Data:', productData);
    console.log('📷 Files:', this.uploadedImages);

    // Example call:
    // this.http.post('/api/products', formData).subscribe(...);

    this.productForm.reset();
    this.uploadedImages = [];
    this.imagePreviews = [];
  } else {
    console.warn('⚠️ Form invalid');
    this.productForm.markAllAsTouched();
  }
}

}
