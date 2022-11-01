import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-auth-window',
  templateUrl: './auth-window.component.html',
  styleUrls: ['./auth-window.component.scss'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AuthWindowComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  signInWindow: boolean = true;
  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.signInWindow = !this.signInWindow;
  }
  close() {
    this.onClose.emit();
  }
}
