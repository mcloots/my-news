import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  errorMessage: string = "";

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/category/form'], { state: { mode: 'add' } })
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/category/form'], { state: { id: id, mode: 'edit' } })
  }

  delete(id: number) {
      this.categoryService.deleteCategory(id).subscribe(result => {
        //all went well
        this.getCategories();
      }, error => {
        //error
        this.errorMessage = error.message;
      })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(result => this.categories = result);
  }
}
