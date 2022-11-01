import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SignInComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  @Output() onClick = new EventEmitter();
  error!: string;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  signIn() {
    this.error = ''
    this.auth
      .signIn(this.email.value, this.password.value)
      .catch((e) => {
        this.email.markAsDirty;
        this.password.markAsDirty;
        this.error = 'Invalid username or password, please try again';
      })
      .finally(() => (this.error === '' ? this.close() : ''));
  }
  signInWithGoogle() {
    this.auth.singInWithGoogle().finally(() => {
      this.close();
    });
  }
  get email() {
    return this.loginForm.get('email')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }
  change() {
    this.onClick.emit();
  }
  close() {
    this.onClose.emit();
  }
}
