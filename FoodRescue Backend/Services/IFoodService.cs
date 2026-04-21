using FoodRescue_Backend.Models;

namespace FoodRescue_Backend.Services
{
    public interface IFoodService
    {
        Task<FoodListing> CreateFood(CreateFoodDto dto, int userId);
        Task<List<FoodListing>> GetActiveFood();
        Task<List<FoodListing>> GetMyListings(int userId);
    }
}
