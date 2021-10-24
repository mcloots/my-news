import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Article} from '../article/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article = {
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
  @Input() isDetail: boolean = false;
  @Input() backRoute: string = '';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  detail(id: number) {
    this.router.navigate(['/article', id]);
    // this.router.navigate(['/article', id, {test: "lala"}]);
  }

  back() {
    this.router.navigate([this.backRoute]);
  }
}
