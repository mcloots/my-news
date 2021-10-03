import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import {CategoryService} from '../category.service';
import {Category} from '../category';
import {of} from 'rxjs';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let fakeCategoryService: CategoryService;

  const categories: Category[] = [
    {id : 1, name : 'Test'},
    {id : 2, name : 'Test2'}
  ];

  beforeEach(() => {
    // Create fake
    fakeCategoryService = jasmine.createSpyObj<CategoryService>(
      'CategoryService',
      {
        getCategories: of(categories),
        getCategoryById: undefined,
        postCategory: undefined,
        putCategory: undefined,
        deleteCategory: undefined,
      }
    );

    TestBed.configureTestingModule({
      declarations: [CategoryListComponent],
      providers: [
        { provide: CategoryService, useValue: fakeCategoryService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get categories test', () => {
    expect(fakeCategoryService.getCategories).toHaveBeenCalled();
  });
});
