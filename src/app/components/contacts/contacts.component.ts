import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  long = 72.83064596901944;
  lat = 19.11459046664269;
  constructor() {}

  ngOnInit(): void {}
}
