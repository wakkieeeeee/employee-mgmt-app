import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSiteComponent } from './news-site.component';

describe('NewsSiteComponent', () => {
  let component: NewsSiteComponent;
  let fixture: ComponentFixture<NewsSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
