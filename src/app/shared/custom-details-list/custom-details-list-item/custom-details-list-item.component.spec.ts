import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDetailsListItemComponent } from './custom-details-list-item.component';

describe('CustomDetailsListItemComponent', () => {
  let component: CustomDetailsListItemComponent;
  let fixture: ComponentFixture<CustomDetailsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDetailsListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDetailsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
