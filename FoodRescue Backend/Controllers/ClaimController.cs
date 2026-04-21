using FoodRescue_Backend.Data;
using FoodRescue_Backend.DTOs;
using FoodRescue_Backend.Hubs;
using FoodRescue_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace FoodRescue_Backend.Controllers
{
    [ApiController]
    [Route("api/claim")]
    [Authorize]
    public class ClaimController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<NotificationHub> _hub;

        public ClaimController(AppDbContext context, IHubContext<NotificationHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        [HttpPost]
        public async Task<IActionResult> ClaimFood(ClaimDto dto)
        {
            int charityId = int.Parse(User.FindFirst("UserId").Value); // from JWT later

            using var transaction = await _context.Database.BeginTransactionAsync();

            var food = await _context.FoodListings
                .FirstOrDefaultAsync(f => f.ListingId == dto.ListingId);

            if (food == null || food.IsClaimed || food.ExpiryTime < DateTime.Now)
                return BadRequest("Already claimed or expired");

            // Insert claim
            var claim = new Claim
            {
                ListingId = dto.ListingId,
                CharityId = charityId,
                Status = "Claimed"
            };

            _context.Claims.Add(claim);

            // Update food
            food.IsClaimed = true;

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            // SignalR event
            await _hub.Clients.All.SendAsync("FoodClaimed", dto.ListingId);

            return Ok("Claim successful");
        }

        [HttpPut("pickup/{id}")]
        public async Task<IActionResult> MarkPickup(int id)
        {
            var claim = await _context.Claims.FindAsync(id);

            if (claim == null)
                return NotFound();

            claim.Status = "PickedUp";

            await _context.SaveChangesAsync();

            return Ok("Pickup completed");
        }
    }
}