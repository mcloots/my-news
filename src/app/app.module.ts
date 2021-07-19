import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ShortenContentPipe } from './shorten-content.pipe';

import { HttpClientModule } from '@angular/common/http';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusListComponent } from './status-list/status-list.component';
import { StatusFormComponent } from './status-form/status-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    MenuComponent,
    HomeComponent,
    ArticleDetailComponent,
    ShortenContentPipe,
    CategoryFormComponent,
    CategoryListComponent,
    StatusListComponent,
    StatusFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
