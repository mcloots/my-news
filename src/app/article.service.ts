import { Injectable } from '@angular/core';
import { Article } from './article';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient : HttpClient) {
  }

  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>("http://localhost:3000/articles");
  }

  getArticleById(id: number) : Observable<Article>{
    return this.httpClient.get<Article>("http://localhost:3000/articles/" + id);
  }

}
