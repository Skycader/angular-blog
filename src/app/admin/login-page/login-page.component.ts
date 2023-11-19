import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  public form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  public loading: boolean = false;
  public message: string = '';

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Пожалуйста, войдите заново';
      }
    });
  }
  submit() {
    this.loading = true;
    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true,
    };

    this.auth.login(user).subscribe((status: any) => {
      this.loading = false;
      if (status === false) {
        this.loading = false;
        // alert('USER NOT FOUND');
        this.form.reset();
        return;
      }
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
    });
  }
}
