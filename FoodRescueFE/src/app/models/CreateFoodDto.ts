export interface CreateFoodDto {
  /** Name of the food item */
  readonly foodName: string;

  /** Number of servings available */
  readonly quantity: number;

  /** Expiry time (ISO string from backend DateTime) */
  readonly expiryTime: string;

  /** Location of the restaurant */
  readonly location: string;
}