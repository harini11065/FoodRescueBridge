import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDash } from './restaurant-dash';

describe('RestaurantDash', () => {
  let component: RestaurantDash;
  let fixture: ComponentFixture<RestaurantDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantDash],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantDash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
