import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-images-view',
  templateUrl: './images-view.component.html',
  styleUrls: ['./images-view.component.scss'],
})
export class ImagesViewComponent implements OnInit {
  @Input() images!: string[];
  image!: string;
  constructor() {}

  ngOnInit(): void {}
  switchImage(link: string) {
    this.image = link;
  }
}
