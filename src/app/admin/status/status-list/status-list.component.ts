import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Status} from '../status';
import {StatusService} from '../status.service';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent implements OnInit, OnDestroy {
  statuses: Status[] = [];
  statuses$: Subscription = new Subscription();
  deleteStatus$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private statusService: StatusService, private router: Router) {
  }

  ngOnInit(): void {
    this.getStatuses();
  }

  ngOnDestroy(): void {
    this.statuses$.unsubscribe();
    this.deleteStatus$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/status/form'], {state: {mode: 'add'}});
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/status/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.deleteStatus$ = this.statusService.deleteStatus(id).subscribe(result => {
      //all went well
      this.getStatuses();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  getStatuses() {
    this.statuses$ = this.statusService.getStatuses().subscribe(result => this.statuses = result);
  }
}
