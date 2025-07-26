// shared/services/snackbar.service.ts

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  private open(message: string, panelClass: string, duration = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }

  success(message: string, duration?: number): void {
    this.open(message, 'snackbar-success', duration);
  }

  error(message: string, duration?: number): void {
    this.open(message, 'snackbar-error', duration);
  }

  info(message: string, duration?: number): void {
    this.open(message, 'snackbar-info', duration);
  }

  warning(message: string, duration?: number): void {
    this.open(message, 'snackbar-warning', duration);
  }
}
