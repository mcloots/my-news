import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.isLoggedinSubject.subscribe(
      result => {
        console.log(result);
      }
    )
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
        localStorage.setItem('id', result.user.id.toString());
        localStorage.setItem('email', result.user.email);

        this.authService.isLoggedinSubject.next(result.accessToken ? true : false);

        //this.router.navigate(['']);
      }, error => {
        this.errorMessage = 'Email/password not correct!';
        this.isSubmitted = false;
      });
    } else {
      alert('work in progress');
    }
  }
}
