import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {CategoryService} from '../../admin/category/category.service';
import {Category} from '../../admin/category/category';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit, OnDestroy {
  // categories select
  categories: Category[] = [];
  // selected category
  categoryId = 0;

  categories$: Subscription = new Subscription();

  @Output() filterCategory = new EventEmitter<number>();

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    // get categories
    this.categories$ = this.categoryService.getCategories().subscribe(result => {
      this.categories = result;
    });
  }

  ngOnDestroy(): void {
    this.categories$.unsubscribe();
  }

  onSubmit(): void {

  }

  onCategoryChange(e: any): void {
    // emit event
    this.filterCategory.emit(+this.categoryId);
  }
}
