import { Component, OnInit } from '@angular/core';
import { Article } from '../article/article';
import { ArticleService } from '../article/article.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles$: Observable<Article[]> = new Observable<Article[]>();

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articles$ = this.articleService.getArticles();
    //this.articles$ = this.articleService.getArticlesByCategoryId(2);
  }
}
