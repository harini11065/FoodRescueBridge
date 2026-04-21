using FoodRescue_Backend.Data;
using FoodRescue_Backend.DTOs;
using FoodRescue_Backend.Hubs;
using FoodRescue_Backend.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace FoodRescue_Backend.Services
{
    public class FoodService : IFoodService

    {
        private readonly AppDbContext _context;
        private readonly IHubContext<NotificationHub> _hubContext;

        public FoodService(AppDbContext context, IHubContext<NotificationHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        public async Task<FoodListing> CreateFood(CreateFoodDto dto, int userId)
        {
            var food = new FoodListing
            {
                FoodName = dto.FoodName,
                Quantity = dto.Quantity,
                ExpiryTime = dto.ExpiryTime,
                Location = dto.Location,
                CreatedBy = userId
            };

            _context.FoodListings.Add(food);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("NewFoodAdded", food);

            return food;
        }

        public async Task<List<FoodListing>> GetActiveFood()
        {
            return await _context.FoodListings
                .Where(f => !f.IsClaimed && f.ExpiryTime > DateTime.Now)
                .ToListAsync();
        }

        public async Task<List<FoodListing>> GetMyListings(int userId)
        {
            return await _context.FoodListings
                .Where(f => f.CreatedBy == userId)
                .ToListAsync();
        }
    }
}
