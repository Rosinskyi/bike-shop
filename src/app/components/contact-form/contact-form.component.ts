import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  model = {
    firstName: '',
    lastName: '',
    email: '',
    text: '',
  };
  constructor() {}

  ngOnInit(): void {}
  onSubmit() {
    console.log(this.model);
  }
}
