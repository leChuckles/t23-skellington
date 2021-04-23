import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkellingtonComponent } from './skellington.component';

describe('SkellingtonComponent', () => {
  let component: SkellingtonComponent;
  let fixture: ComponentFixture<SkellingtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkellingtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkellingtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
