import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-shop-add',
  standalone: true,
  templateUrl: './shop-add.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
  ],
})
export class ShopAddComponent {
  shop_name: string = '';
  location: string = '';
  status: string = 'approved';

  onSubmit() {
    const payload = {
      shop_name: this.shop_name,
      location: this.location,
      status: this.status,
    };
    console.log('Submit shop form:', payload);
    // TODO: Replace with HTTP POST to http://localhost:3000/api/shop/create
  }
}
