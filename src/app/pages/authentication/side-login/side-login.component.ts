import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../service/auth.service';
import { UserStateService } from '../service/user-state.service';

// ✅ Interfaces defined inside the component file
interface AuthLoginRequest {
  email: string;
  password: string;
}

interface AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
}

interface AuthLoginResponse {

    token: string;
    redirectPath: string;
    user: AuthUser

}


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
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router,  private userState: UserStateService ) {}

  get f() {
    return this.form.controls;
  }

  submit(): void {
    if (this.form.invalid) return;

    const loginPayload: AuthLoginRequest = this.form.value as AuthLoginRequest;
    this.isSubmitting = true;

    this.authService.post<AuthLoginResponse>('auth/signin', loginPayload).subscribe({
      next: (res) => {
        debugger
        const { token, user, redirectPath } = res;

      // ✅ Save in centralized state
     
        this.userState.setUser(user, token);

       
        this.router.navigate([redirectPath]);
      },
      error: (err) => {
       
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
