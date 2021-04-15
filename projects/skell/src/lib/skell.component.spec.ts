import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkellComponent } from './skell.component';

describe('SkellComponent', () => {
  let component: SkellComponent;
  let fixture: ComponentFixture<SkellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
