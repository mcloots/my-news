import {Injectable} from '@angular/core';
import {Article} from './article';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Status} from '../admin/status/status';
import {AuthService} from '../security/auth.service';
import {StatusEnum} from '../admin/status/status-enum';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  getArticles(): Observable<Article[]> {
    //return timer(1, 3000).pipe(switchMap(() => this.httpClient.get<Article[]>("http://localhost:3000/articles")));
    return this.httpClient.get<Article[]>('http://localhost:3000/articles');
  }

  getArticlesFromUser(): Observable<Article[]> {
    //return timer(1, 3000).pipe(switchMap(() => this.httpClient.get<Article[]>("http://localhost:3000/articles")));
    return this.httpClient.get<Article[]>('http://localhost:3000/articles?authorId=' + this.authService.getUser()?.id + '&_sort=id&_order=desc&_expand=status&_expand=category');
  }

  getArticleById(id: number): Observable<Article> {
    return this.httpClient.get<Article>('http://localhost:3000/articles/' + id);
  }

  getArticlesByStatusId(statusId: number): Observable<Article[]> {
    return this.httpClient.get<Article[]>('http://localhost:3000/articles?statusId=' + statusId);
  }

  getArticlesByCategoryAndStatus(categoryId: number, statusId: number): Observable<Article[]> {
    return this.httpClient.get<Article[]>('http://localhost:3000/articles?categoryId=' + categoryId + '&statusId=' + statusId);
  }

  postArticle(article: Article): Observable<Article> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Article>('http://localhost:3000/articles', article, {headers: headers});
  }

  putArticle(id: number, article: Article): Observable<Article> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Article>("http://localhost:3000/articles/" + id, article, {headers: headers});
  }

  deleteArticle(id: number): Observable<Article> {
    return this.httpClient.delete<Article>('http://localhost:3000/articles/' + id);
  }

  publishArticle(id: number): Observable<Article> {
    return this.getArticleById(id).pipe(
      switchMap(article => {
        article.statusId = StatusEnum.PUBLISHED;
        return this.putArticle(id, article);
      })
    );

  }
}
