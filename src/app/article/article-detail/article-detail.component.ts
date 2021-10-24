import {Component, OnInit} from '@angular/core';
import {Article} from '../../article/article';
import {ArticleService} from '../../article/article.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: Article = {
    id: 0,
    title: '',
    subtitle: '',
    imageUrl: '',
    imageCaption: '',
    content: '',
    author: '',
    authorId: 0,
    publishDate: '',
    categoryId: 0,
    statusId: 0,
    status: {id: 0, name: '', active: false},
    category: {id: 0, name: ''}
  };

  constructor(private articleService: ArticleService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId != null) {
      this.articleService.getArticleById(+articleId).subscribe(result => this.article = result);
    }
  }
}

