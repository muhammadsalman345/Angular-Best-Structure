import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  standalone: true,
  imports: [
    MaterialModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    TablerIconsModule,
    MatProgressBarModule,
    NgScrollbarModule,
  ],
})
export class DynamicTableComponent implements OnInit {
  @Input() displayedColumns: string[] = [];
  @Input() columnHeaders: { [key: string]: string } = {};
  @Input() dataSource: any[] = [];
  @Input() actions: { label: string; icon: string }[] = [];

  @Output() actionClick = new EventEmitter<{ action: string; row: any }>();

  onAction(action: string, row: any) {
    this.actionClick.emit({ action, row });
  }

  ngOnInit() {
    console.log('Received data source:', this.dataSource);
  }
}