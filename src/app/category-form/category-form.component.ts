import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  categoryId: number = 0;

  category: Category = { id: 0, name: "" };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  constructor(private router: Router, private categoryService: CategoryService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.categoryId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.categoryId != null && this.categoryId > 0) {
      this.categoryService.getCategoryById(this.categoryId).subscribe(result => this.category = result);
    }

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.categoryService.postCategory(this.category).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/admin/category");
      },
        error => {
          this.errorMessage = error.message;
        });
    }
    if (this.isEdit) {
      this.categoryService.putCategory(this.categoryId, this.category).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/admin/category");
      },
        error => {
          this.errorMessage = error.message;
        });
    }
  }

}
