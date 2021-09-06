import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from './shared/shared.module';
import {ArticleModule} from './article/article.module';
import {SecurityModule} from './security/security.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SecurityInterceptor} from './security/security.interceptor';
import {AuthGuard} from './security/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ArticleModule,
    SecurityModule
  ],
  providers: [

    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
