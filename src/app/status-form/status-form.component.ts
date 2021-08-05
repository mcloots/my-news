import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Status} from '../status';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {StatusService} from '../status.service';
import {createOneCapitalLetterValidator} from '../one-capital-letter-validator';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.scss']
})
export class StatusFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  statusId: number = 0;

  isSubmitted: boolean = false;
  errorMessage: string = '';
  nameChangeMessage: string = '';

  status$: Subscription = new Subscription();
  postStatus$: Subscription = new Subscription();
  putStatus$: Subscription = new Subscription();

  // reactive form
  statusForm = new FormGroup({
    name: new FormControl('', [Validators.required, createOneCapitalLetterValidator()]),
    active: new FormControl('')
  });

  constructor(private router: Router, private statusService: StatusService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.statusId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.statusId != null && this.statusId > 0) {
      this.status$ = this.statusService.getStatusById(this.statusId).subscribe(result => {
        this.statusForm.setValue({
          name: result.name,
          active: result.active
        });
      });
    }
  }

  ngOnInit(): void {
    this.onChanges();
  }

  ngOnDestroy(): void {
    this.status$.unsubscribe();
    this.postStatus$.unsubscribe();
    this.putStatus$.unsubscribe();
  }

  setDefaults(): void {
    this.statusForm.patchValue({
      name: 'New status',
      active: true
    });
  }

  onChanges(): void {
    this.statusForm.get('name')?.valueChanges.subscribe(val => {
      this.nameChangeMessage = `Value of 'name' changed to: ${val}`;
    });
  }
  onSubmit(): void {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postStatus$ = this.statusService.postStatus(this.statusForm.value).subscribe(result => {
          //all went well
          this.router.navigateByUrl("/admin/status");
        },
        error => {
          this.errorMessage = error.message;
        });
    }
    if (this.isEdit) {
      this.putStatus$ = this.statusService.putStatus(this.statusId, this.statusForm.value).subscribe(result => {
          //all went well
          this.router.navigateByUrl("/admin/status");
        },
        error => {
          this.errorMessage = error.message;
        });
    }
  }

}
