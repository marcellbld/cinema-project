import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/models/user/user';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  user$: Observable<User> | undefined;

  form = new FormGroup({
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

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService
      .findById(this.authService.loggedInUser()?.id!)
      .subscribe((user) => {
        this.form.setValue({
          fullName: user.fullName ?? '',
          phone: user.phone ?? '',
        });
        this.user$ = of(user);
      });
  }

  register() {
    if (this.form.valid) {
      this.userService
        .update({
          id: this.authService.loggedInUser()?.id,
          fullName: this.fullName.value,
          phone: this.phone.value,
        })
        .subscribe((user) => {
          this.form.setValue({
            fullName: user.fullName ?? '',
            phone: user.phone ?? '',
          });
          this.user$ = of(user);
        });
    }
  }

  get fullName(): FormControl {
    return this.form.get('fullName') as FormControl;
  }

  get phone(): FormControl {
    return this.form.get('phone') as FormControl;
  }
}
