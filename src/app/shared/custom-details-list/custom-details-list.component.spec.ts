import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDetailsListComponent } from './custom-details-list.component';

describe('CustomDetailsListComponent', () => {
  let component: CustomDetailsListComponent;
  let fixture: ComponentFixture<CustomDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDetailsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
