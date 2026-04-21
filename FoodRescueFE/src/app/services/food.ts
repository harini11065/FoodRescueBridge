import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { CreateFoodDto } from '../models/CreateFoodDto';

/**
 * Service to manage food data (mock backend)
 */
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  /** Internal in-memory storage */
  private readonly foodsSignal = signal<CreateFoodDto[]>([
    {
      foodName: 'Veg Biryani',
      quantity: 10,
      expiryTime: this.futureTime(300),
      location: 'Chennai'
    },
    {
      foodName: 'Curd Rice',
      quantity: 5,
      expiryTime: this.futureTime(120),
      location: 'Coimbatore'
    }
  ]);

  /**
   * Get all foods (simulate API)
   */
  getFoods(): Observable<readonly CreateFoodDto[]> {
    return of(this.foodsSignal()).pipe(delay(500));
  }

  /**
   * Add a new food item
   */
  addFood(food: CreateFoodDto): Observable<boolean> {
    const current = this.foodsSignal();

    this.foodsSignal.set([...current, food]);

    return of(true).pipe(delay(300)); // simulate API delay
  }

  /**
   * Remove expired foods (optional utility)
   */
  removeExpired(): void {
    const now = Date.now();

    const filtered = this.foodsSignal().filter(food => {
      return new Date(food.expiryTime).getTime() > now;
    });

    this.foodsSignal.set(filtered);
  }

  /**
   * Helper: generate future expiry time
   */
  private futureTime(seconds: number): string {
    return new Date(Date.now() + seconds * 1000).toISOString();
  }
}