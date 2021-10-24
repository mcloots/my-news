import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {createOneCapitalLetterValidator} from '../../shared/one-capital-letter-validator';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ArticleService} from '../article.service';
import {Subscription} from 'rxjs';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {finalize, map} from 'rxjs/operators';
import {AuthService} from '../../security/auth.service';
import {CategoryService} from '../../admin/category/category.service';
import {Category} from '../../admin/category/category';
import {StatusService} from '../../admin/status/status.service';
import {Status} from '../../admin/status/status';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;

  isSubmitted: boolean = false;
  errorMessage: string = '';

  postArticle$: Subscription = new Subscription();
  categories$: Subscription = new Subscription();
  statuses$: Subscription = new Subscription();

  imageSrc: string = '';

// reactive form
  articleForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    subtitle: new FormControl('', [Validators.required]),
    imageUrl: new FormControl(''),
    imageCaption: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    authorId: new FormControl(''),
    author: new FormControl(''),
    categoryId: new FormControl('', [Validators.required]),
    statusId: new FormControl(1, [Validators.required]), // default status is draft
    // publishDate: new FormControl(new Date()),

  });

  // Uploading image
  ref: AngularFireStorageReference | undefined;
  task: AngularFireUploadTask | undefined;
  filePath = `articles/`;
  imageFile: any;
  uploadProgress: number | undefined;

  // categories select
  categories: Category[] = [];

  // status
  statuses: Status[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private articleService: ArticleService,
              private categoryService: CategoryService,
              private statusService: StatusService,
              private authService: AuthService,
              private angularFireStorage: AngularFireStorage) {
    this.isAdd = this.router.url === '/newarticle';
    this.isEdit = !this.isAdd;
  }

  ngOnInit(): void {
    // get article if in edit
    // get article if in edit
    if (this.isEdit) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id != null) {
        this.articleService.getArticleById(+id).subscribe(result => {
          this.imageSrc = result.imageUrl;
          this.articleForm.patchValue({
            id: result.id,
            title: result.title,
            subtitle: result.subtitle,
            imageUrl: result.imageUrl,
            imageCaption: result.imageCaption,
            content: result.content,
            authorId: result.authorId,
            author: result.author,
            categoryId: result.categoryId,
            statusId: result.statusId,
          });
        });
      }
    }

    // get categories
    this.categories$ = this.categoryService.getCategories().subscribe(result => {
      this.categories = result;
    });

    // get statuses
    this.statuses$ = this.statusService.getStatuses().subscribe(result => {
      this.statuses = result;
    });

    // set user in form (= author)
    const author = this.authService.getUser() ?? null;
    if (author !== null) {
      this.articleForm.patchValue({
        authorId: author.id,
        author: author.email,
      });
    }
  }

  ngOnDestroy(): void {
    this.postArticle$.unsubscribe();
    this.categories$.unsubscribe();
    this.statuses$.unsubscribe();
  }

  getTitle(): string {
    if (this.isAdd) {
      return 'Add new article';
    } else {
      return 'Edit article';
    }
  }

  onImageSelected(event: any): void {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    this.filePath += randomId;
    // create a reference to the storage bucket location
    this.ref = this.angularFireStorage.ref(this.filePath);
    this.imageFile = event.target.files[0];
    this.imageSrc = '';
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.imageFile === undefined) {
      this.isSubmitted = false;
      this.errorMessage = 'No image selected!';
    } else {
      if (this.isAdd) {
        this.task = this.angularFireStorage.upload(this.filePath, this.imageFile);
        this.task.snapshotChanges().subscribe(result => {
          this.ref?.getDownloadURL().subscribe(url => {
            this.articleForm.patchValue({
              imageUrl: url
            });
            if (url !== undefined) {
              this.postArticle$ = this.articleService.postArticle(this.articleForm.value).subscribe(result => {
                  this.router.navigateByUrl('/');
                },
                error => {
                  this.isSubmitted = false;
                  this.errorMessage = error.message;
                });
            }
          });
        });
        this.task.percentageChanges().subscribe(p => this.uploadProgress = p);
      }
    }
  }

}
