import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { AppBlogCardsComponent } from 'src/app/components/blog-card/blog-card.component';
import { AppSalesProfitComponent } from 'src/app/components/sales-profit/sales-profit.component';
import { AppTotalFollowersComponent } from 'src/app/components/total-followers/total-followers.component';
import { AppTotalIncomeComponent } from 'src/app/components/total-income/total-income.component';
import { AppPopularProductsComponent } from 'src/app/components/popular-products/popular-products.component';
import { AppEarningReportsComponent } from 'src/app/components/earning-reports/earning-reports.component';
import { Column } from 'src/app/components/dynamic-table/interface/column.model';
import { DynamicTableComponent } from 'src/app/components/dynamic-table/dynamic-table.component';
import { AdminService } from './admin-service/admin.service';
import { User } from './model/user.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-starter',
  imports: [
    MaterialModule,
    AppBlogCardsComponent,
    AppSalesProfitComponent,
    AppTotalFollowersComponent,
    AppTotalIncomeComponent,
    DynamicTableComponent,
    AppEarningReportsComponent
  ],
  templateUrl: './admindashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  dataSource: any[] = [];
  displayedColumns: string[] = ['id','users', 'email', 'status', 'menu' ]; // Updated columns
  columnHeaders: { [key: string]: string } = {
    id: 'ID',
    users: 'Users',
    email: 'Email',
    status: 'Status',
    menu: 'Actions',
  };
  actions = [
    { label: 'Add', icon: 'plus' },
    { label: 'Edit', icon: 'edit' },
    { label: 'Delete', icon: 'trash' },
  ];

  // onActionClick(action: string, row: User) {
  //   console.log(`${action} clicked for`, row);
  // }

  users$!: Observable<any[]>;
  private subscription!: Subscription;

  constructor(private apiService: AdminService) {}

  ngOnInit(): void {
    debugger
    this.users$ = this.apiService.getUsers('all');

    this.subscription = this.apiService.getUsers('all').subscribe((data) => {
      console.log('Users all:', data);
      this.dataSource = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onActionClick(action: string, row: User) {
    if (action === 'Edit') {
      this.toggleStatus(row);
    } else if (action === 'Delete') {
      console.log(`Delete clicked for`, row);
      // Implement delete logic here
    }
  }

  toggleStatus(user: User): void {
    user.status = !user.status;
    console.log(`User ${user.id} status updated to ${user.status}`);
    // this.apiService.updateUser(user).subscribe(() => {
    //   console.log(`User ${user.id} status updated to ${user.status}`);
    // });
  }

}