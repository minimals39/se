import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateactComponent } from './createact.component';

describe('CreateactComponent', () => {
  let component: CreateactComponent;
  let fixture: ComponentFixture<CreateactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
