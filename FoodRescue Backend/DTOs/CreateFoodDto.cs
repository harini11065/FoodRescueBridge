namespace FoodRescue_Backend.DTOs
{
    public class CreateFoodDto
    {
        public string FoodName { get; set; }
        public int Quantity { get; set; }
        public DateTime ExpiryTime { get; set; }
        public string Location { get; set; }
    }
}
