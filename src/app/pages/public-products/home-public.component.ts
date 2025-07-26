import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppBlogCardsComponent } from 'src/app/components/blog-card/blog-card.component';


@Component({
  selector: 'app-starter-home',
  imports: [
    MaterialModule,
    AppBlogCardsComponent,
   
  ],
  templateUrl: './home-public.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PublicProductsComponent { }
