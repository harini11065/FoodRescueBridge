using System.ComponentModel.DataAnnotations;
namespace FoodRescue_Backend.Models
{
    public class FoodListing
    {
        [Key]
        public int ListingId { get; set; }
        public string FoodName { get; set; }
        public int Quantity { get; set; }
        public DateTime ExpiryTime { get; set; }
        public string Location { get; set; }
        public bool IsClaimed { get; set; } = false;
        public int CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
