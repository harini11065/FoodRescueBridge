import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Food {
  id: number;
  title: string;
  quantity: number;
  expiryTime: string;
  status: 'Active' | 'Claimed' | 'PickedUp';
  createdById: number;
  claimedById?: number;
}

@Component({
  selector: 'app-charity-dash',
  imports: [CommonModule],
  templateUrl: './charity-dash.html',
  styleUrl: './charity-dash.css',
})
export class CharityDash implements OnInit {

  currentUserId = 2;

  foods: Food[] = [];
  myClaims: Food[] = [];

  ngOnInit() {
    this.loadMockData();
  }

  // 🔹 MOCK DATA
  loadMockData() {
    this.foods = [
      {
        id: 1,
        title: 'Veg Meals',
        quantity: 10,
        expiryTime: new Date().toISOString(),
        status: 'Active',
        createdById: 1
      },
      {
        id: 2,
        title: 'Rice & Curry',
        quantity: 15,
        expiryTime: new Date().toISOString(),
        status: 'Active',
        createdById: 1
      },
      {
        id: 3,
        title: 'Chapati Set',
        quantity: 8,
        expiryTime: new Date().toISOString(),
        status: 'Active',
        createdById: 1
      }
    ];
  }

  // 🔒 CLAIM
  claim(food: Food) {
  const claimedFood: Food = {
    ...food,
    status: 'Claimed',
    claimedById: this.currentUserId
  };

  this.myClaims.push(claimedFood);
  this.foods = this.foods.filter(f => f.id !== food.id);
}

  // 📦 PICKUP
  pickup(food: Food) {
    this.myClaims = this.myClaims.filter(f => f.id !== food.id);
  }
}
