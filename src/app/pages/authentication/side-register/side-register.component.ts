import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../service/auth.service';
import { SnackbarService } from '../service/snackbar.service';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {


  constructor(    private authService: AuthService, private router: Router,
    private _SnackbarService:SnackbarService
  ) {}

form = new FormGroup({
  firstName: new FormControl('', [Validators.required]),
  lastName: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  phoneNumber: new FormControl('', [Validators.required]),
  role: new FormControl('user') // default role
});
  get f() {
    return this.form.controls;
  }

 submit() {
  if (this.form.invalid) return;

  const payload = this.form.value;

  this.authService.post('auth/signup', payload).subscribe({
    next: () => {
     this._SnackbarService.success('Signup success:')

      this.router.navigate(['/authentication/login']);
    },
    error: () => {
      this._SnackbarService.error('Signup failed:')
      
    }
  });
}

}
