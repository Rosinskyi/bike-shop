import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SignUpComponent implements OnInit {
  @Output() onClick = new EventEmitter();
  @Output() onClose = new EventEmitter();
  error: string = '';
  registrationForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private auth: AuthService, private userService: UserService) {}

  ngOnInit(): void {}
  signUp() {
    this.error = '';
    this.auth
      .signUp(this.email.value, this.password.value)
      .then((credential) => {
        this.userService.createUser(credential.user);
      })
      .catch((e) => {
        this.error = 'The email address is already in use by another account.';
      })
      .finally(() => {
        this.error === '' ? this.close() : '';
      });
  }

  get email() {
    return this.registrationForm.get('email')!;
  }
  get password() {
    return this.registrationForm.get('password')!;
  }
  switch() {
    this.onClick.emit();
  }
  close() {
    this.onClose.emit();
  }
}
