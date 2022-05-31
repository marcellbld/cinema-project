import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LoginResponse } from 'src/app/core/models/user/login-response';
export class MyTel {
  constructor(
    public area: string,
    public exchange: string,
    public subscriber: string
  ) {}
}

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15),
    ]),
    password: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(10),
    ]),
  });

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  register() {
    if (this.form.valid) {
      this.authService
        .register({
          username: this.username.value,
          password: this.password.value,
          fullName: this.fullName.value,
          phone: this.phone.value,
        })
        .subscribe({
          next: (response: LoginResponse) => {
            if (response) {
              this.router.navigate(['/']);
            }
          },
        });
    }
  }

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get fullName(): FormControl {
    return this.form.get('fullName') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get phone(): FormControl {
    return this.form.get('phone') as FormControl;
  }
}
