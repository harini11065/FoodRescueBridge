namespace FoodRescue_Backend.Models
{
    public class Claim
    {
        public int ClaimId { get; set; }
        public int ListingId { get; set; }
        public int CharityId { get; set; }
        public DateTime ClaimedAt { get; set; } = DateTime.Now;
        public string Status { get; set; }
    }
}
