import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ShortenContentPipe } from './shorten-content.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    MenuComponent,
    HomeComponent,
    ArticleDetailComponent,
    ShortenContentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
