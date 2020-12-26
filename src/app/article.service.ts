import { Injectable } from '@angular/core';
import { Article } from './article';

import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) {
  }

  getArticles(): Observable<Article[]> {
    return timer(1, 3000).pipe(switchMap(() => this.httpClient.get<Article[]>("http://localhost:3000/articles")));
   // return this.httpClient.get<Article[]>("http://localhost:3000/articles");
  }

  getArticleById(id: number): Observable<Article> {
    return this.httpClient.get<Article>("http://localhost:3000/articles/" + id);
  }

}
