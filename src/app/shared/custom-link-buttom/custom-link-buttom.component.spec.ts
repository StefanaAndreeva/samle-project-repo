import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLinkButtomComponent } from './custom-link-buttom.component';

describe('CustomLinkButtomComponent', () => {
  let component: CustomLinkButtomComponent;
  let fixture: ComponentFixture<CustomLinkButtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomLinkButtomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLinkButtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
