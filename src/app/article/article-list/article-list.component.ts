import {Component, OnInit} from '@angular/core';
import {Status} from '../../admin/status/status';
import {Subscription} from 'rxjs';
import {Article} from '../article';
import {ArticleService} from '../article.service';
import {Router} from '@angular/router';
import {StatusEnum} from '../../admin/status/status-enum';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  articles$: Subscription = new Subscription();
  deleteArticle$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private articleService: ArticleService, private router: Router) {
  }

  ngOnInit(): void {
    this.getArticles();
  }

  ngOnDestroy(): void {
    this.articles$.unsubscribe();
    this.deleteArticle$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['newarticle']);
  }

  edit(id: number) {
    //TODO
    this.router.navigate(['editarticle/' + id]);
  }

  delete(id: number) {
    this.deleteArticle$ = this.articleService.deleteArticle(id).subscribe(result => {
      //all went well
      this.getArticles();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  getArticles() {
    this.articles$ = this.articleService.getArticlesFromUser().subscribe(result => this.articles = result);
  }

  isUnpublished(article: Article): boolean {
    return article.statusId !== StatusEnum.PUBLISHED;
  }

  publish(articleId: number): void {
    this.articleService.publishArticle(articleId).subscribe(result => {
      this.getArticles();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

}
