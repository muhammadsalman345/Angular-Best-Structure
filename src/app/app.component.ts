import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserStateService } from './pages/authentication/service/user-state.service';
import { SnackbarService } from './pages/authentication/service/snackbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  title = 'Modernize Angular Admin Template';

  constructor(private userState: UserStateService,private snackBar: SnackbarService) {}

ngAfterViewInit(): void {
const user = this.userState.user;
    const token = localStorage.getItem('token');

    if (!token || !user) {
      this.snackBar.error('User or token missing, logging out...')
    
      this.userState.logout();
    } else {
      this.snackBar.success('User already login')
    }
  }
}
