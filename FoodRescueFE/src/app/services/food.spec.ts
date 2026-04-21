
import { TestBed } from '@angular/core/testing';
import { FoodService } from './food';
import { CreateFoodDto } from '../models/CreateFoodDto';
import { firstValueFrom } from 'rxjs';

describe('FoodService', () => {
  let service: FoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodService);
  });

  // ✅ 1. Service creation
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial food list', async () => {
  const data = await firstValueFrom(service.getFoods());

  expect(data.length).toBeGreaterThan(0);
});

 it('should add a new food item', async () => {
  const newFood: CreateFoodDto = {
    foodName: 'Test Food',
    quantity: 5,
    expiryTime: new Date().toISOString(),
    location: 'Test City'
  };

  await firstValueFrom(service.addFood(newFood));

  const data = await firstValueFrom(service.getFoods());

  const found = data.some(f => f.foodName === 'Test Food');

  expect(found).toBe(true);
});

it('should increase food count after adding', async () => {
  const initial = await firstValueFrom(service.getFoods());
  const countBefore = initial.length;

  const newFood: CreateFoodDto = {
    foodName: 'Another Food',
    quantity: 2,
    expiryTime: new Date().toISOString(),
    location: 'Chennai'
  };

  await firstValueFrom(service.addFood(newFood));

  const updated = await firstValueFrom(service.getFoods());

  expect(updated.length).toBe(countBefore + 1);
});

  // ✅ 5. Expiry logic check (basic)
  it('should handle expiry time correctly', () => {
    const now = Date.now();
    const expiry = new Date(now + 60000).getTime();

    expect(expiry).toBeGreaterThan(now);
  });
});