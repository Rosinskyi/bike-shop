import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankfulPageComponent } from './thankful-page.component';

describe('ThankfulPageComponent', () => {
  let component: ThankfulPageComponent;
  let fixture: ComponentFixture<ThankfulPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankfulPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankfulPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
