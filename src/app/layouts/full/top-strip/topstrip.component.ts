import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
    selector: 'app-topstrip',
    imports: [TablerIconsModule, MatButtonModule, MatMenuModule],
    templateUrl: './topstrip.component.html',  styles: [`
        .news-ticker-container {
          width: 100%;
          // background-color: #1976d2;
          // color: white;
          overflow: hidden;
          white-space: nowrap;
        }
    
        .news-ticker {
          display: inline-block;
          padding-left: 100%;
          animation: scroll-left 45s linear infinite;
        }
    
        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `]
    })
    export class AppTopstripComponent {}