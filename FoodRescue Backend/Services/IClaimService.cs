namespace FoodRescue_Backend.Services
{
    public interface IClaimService
    {
        Task<bool> ClaimFood(int listingId, int charityId);
        Task<bool> MarkPickup(int claimId);
    }
}
