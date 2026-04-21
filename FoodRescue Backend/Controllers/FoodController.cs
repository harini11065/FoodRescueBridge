using FoodRescue_Backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace FoodRescue_Backend.Controllers
{
    [ApiController]
    [Route("api/food")]
    public class FoodController : ControllerBase
    {

        private readonly AppDbContext _context;
        private readonly IHubContext<NotificationHub> _hub;

        public FoodController(AppDbContext context, IHubContext<NotificationHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateFood(CreateFoodDto dto)
        {
            // TODO: Get from JWT later
            int restaurantId = 1;

            var food = new FoodListing
            {
                FoodName = dto.FoodName,
                Quantity = dto.Quantity,
                ExpiryTime = dto.ExpiryTime,
                Location = dto.Location,
                CreatedBy = restaurantId
            };

            _context.FoodListings.Add(food);
            await _context.SaveChangesAsync();

            // SignalR event
            await _hub.Clients.All.SendAsync("NewFoodAdded", food);

            return Ok(food);
        }

        [HttpGet("active")]
        public IActionResult GetActiveFood()
        {
            var data = _context.FoodListings
                .Where(f => !f.IsClaimed && f.ExpiryTime > DateTime.Now)
                .ToList();

            return Ok(data);
        }

        [HttpGet("my-listings")]
        public IActionResult GetMyListings()
        {
            int restaurantId = 1; // from JWT later

            var data = _context.FoodListings
                .Where(f => f.CreatedBy == restaurantId)
                .ToList();

            return Ok(data);
        }
}
