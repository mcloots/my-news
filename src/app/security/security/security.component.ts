import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {authenticatedUser} from '../../store/actions/user.actions';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
  user: User = {id: 0, email: '', password: '', token: ''};

  isSubmitted: boolean = false;
  errorMessage: string = '';

  isLogin: boolean = false;
  isRegister: boolean = false;
  isLogout: boolean = false;

  //users$: Observable<User[]>;

  constructor(private authService: AuthService, private router: Router, private store: Store<{ user: User[]}>) {
    store.select('user').subscribe(r => {
      console.log(r);
    });
  }

  ngOnInit(): void {
    switch (this.router.url) {
      case '/login': {
        this.isLogin = true;
        break;
      }
      case '/logout': {
        this.isLogout = true;
        this.authService.deleteToken();
        this.router.navigate(['']);
        break;
      }
      case '/register': {
        this.isRegister = true;
        break;
      }
      default: {
        this.isLogin = true;
        break;
      }
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.isLogin) {
      this.authService.authenticate(this.user).subscribe(result => {
        this.errorMessage = '';
        // save access token localstorage
        localStorage.setItem('token', result.accessToken);
        const testArray: User[] = [];
        testArray.push(result.user);
        this.store.dispatch(authenticatedUser({ user: testArray }));
        this.router.navigate(['']);
      }, error => {
        this.errorMessage = 'Email/password not correct!';
        this.isSubmitted = false;
      });
    } else {
      alert('work in progress');
    }
  }
}
