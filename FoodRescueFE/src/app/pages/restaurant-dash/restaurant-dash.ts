import {
  Component,
  OnInit,
  signal,
  computed,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodService } from '../../services/food';
import { CreateFoodDto } from '../../models/CreateFoodDto';
import { interval } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurant-dash',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './restaurant-dash.html',
  styleUrls: ['./restaurant-dash.css']
})
export class RestaurantDash implements OnInit {

  private readonly foodService = inject(FoodService);
  private readonly tick = toSignal(interval(1000), { initialValue: 0 });

  /** Store foods */
  readonly foods = signal<readonly CreateFoodDto[]>([]);

  showForm = signal(false);

newFood = signal({
  foodName: '',
  quantity: 0,
  expiryTime: '',
  location: ''
});
openForm() {
  this.showForm.set(true);
}

closeForm() {
  this.showForm.set(false);
}

submitFood() {
  const food = this.newFood();

  this.foodService.addFood({
    ...food,
    expiryTime: new Date(food.expiryTime).toISOString()
  }).subscribe(() => {
    this.loadFoods();
    this.closeForm();

    // reset form
    this.newFood.set({
      foodName: '',
      quantity: 0,
      expiryTime: '',
      location: ''
    });
  });
}

  /** Load foods on init */
  ngOnInit(): void {
    this.loadFoods();
  }

  /**
   * Fetch foods from service
   */
  loadFoods(): void {
    this.foodService.getFoods().subscribe(data => {
      this.foods.set(data);
    });
  }

  /**
   * Add sample food (for testing UI)
   */
  addSampleFood(): void {
    this.foodService.addFood({
      foodName: 'Paneer Fried Rice',
      quantity: 7,
      expiryTime: new Date(Date.now() + 120000).toISOString(), // 2 mins
      location: 'Salem'
    }).subscribe(() => {
      this.loadFoods(); // refresh UI
    });
  }

  /**
   * Calculate remaining time
   */
  getRemainingTime(expiryTime: string): string {
  this.tick(); // 👈 THIS LINE MAKES IT LIVE

  const diff = new Date(expiryTime).getTime() - Date.now();

  if (diff <= 0) return 'Expired';

  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const remSec = sec % 60;

  return `${min}m ${remSec}s`;
}
}