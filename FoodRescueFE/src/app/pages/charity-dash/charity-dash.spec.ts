import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityDash } from './charity-dash';

describe('CharityDash', () => {
  let component: CharityDash;
  let fixture: ComponentFixture<CharityDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharityDash],
    }).compileComponents();

    fixture = TestBed.createComponent(CharityDash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
