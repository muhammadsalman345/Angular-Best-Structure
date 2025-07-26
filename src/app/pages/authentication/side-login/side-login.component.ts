import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
  ],
  templateUrl: './side-login.component.html',
  
})
export class AppSideLoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService) {}

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.value as { email: string; password: string });
    }
  }
}
