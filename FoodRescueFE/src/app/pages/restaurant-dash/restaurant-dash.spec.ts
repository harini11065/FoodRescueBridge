import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantDash } from './restaurant-dash';
import { FoodService } from '../../services/food';

describe('RestaurantDashComponent', () => {
  let component: RestaurantDash;
  let fixture: ComponentFixture<RestaurantDash>;
  let service: FoodService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantDash],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantDash);
    component = fixture.componentInstance;
    service = TestBed.inject(FoodService);

    fixture.detectChanges();
  });

  // ✅ 1. Component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ✅ 2. Should load foods on init
  it('should load foods on init', async () => {
    component.loadFoods();

    await new Promise(resolve => setTimeout(resolve, 600));

    expect(component.foods().length).toBeGreaterThan(0);
  });

  // ✅ 3. Form open logic
  it('should open form', () => {
    component.openForm();
    expect(component.showForm()).toBe(true);
  });

  // ✅ 4. Form close logic
  it('should close form', () => {
    component.openForm();
    component.closeForm();
    expect(component.showForm()).toBe(false);
  });

  // ✅ 5. Add food through component
  it('should add food via component', async () => {
    component.newFood.set({
      foodName: 'Component Food',
      quantity: 3,
      expiryTime: new Date().toISOString(),
      location: 'Madurai'
    });

    component.submitFood();

    await new Promise(resolve => setTimeout(resolve, 1200));

    expect(component.foods().some(f => f.foodName === 'Component Food')).toBe(true);
  });

  // ✅ 6. Countdown logic test
  it('should return remaining time string', () => {
    const future = new Date(Date.now() + 60000).toISOString();

    const result = component.getRemainingTime(future);

    expect(result).toContain('m');
  });

  // ✅ 7. Expired case
  it('should return Expired for past time', () => {
    const past = new Date(Date.now() - 60000).toISOString();

    const result = component.getRemainingTime(past);

    expect(result).toBe('Expired');
  });
});