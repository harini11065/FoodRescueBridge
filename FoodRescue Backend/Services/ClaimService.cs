namespace FoodRescue_Backend.Services;

using FoodRescue_Backend.Data;
using FoodRescue_Backend.Hubs;
using FoodRescue_Backend.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

public class ClaimService : IClaimService
{
    private readonly AppDbContext _context;
    private readonly IHubContext<NotificationHub> _hubContext;

    public ClaimService(AppDbContext context, IHubContext<NotificationHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }

    public async Task<bool> ClaimFood(int listingId, int charityId)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            // Step 1: Get food
            var food = await _context.FoodListings
                .FirstOrDefaultAsync(f => f.ListingId == listingId);

            if (food == null)
                return false;

            // Step 2: Check already claimed
            if (food.IsClaimed)
                return false;

            // Step 3: Insert claim
            var claim = new Claim
            {
                ListingId = listingId,
                CharityId = charityId,
                Status = "Claimed"
            };

            _context.Claims.Add(claim);

            // Step 4: Update food
            food.IsClaimed = true;

            // Step 5: Save
            await _context.SaveChangesAsync();


            // Step 6: Commit
            await transaction.CommitAsync();
            await _hubContext.Clients.All.SendAsync("FoodClaimed", listingId);

            return true;
        }
        catch
        {
            await transaction.RollbackAsync();
            return false;
        }
    }

    public async Task<bool> MarkPickup(int claimId)
    {
        var claim = await _context.Claims
            .FirstOrDefaultAsync(c => c.ClaimId == claimId);

        if (claim == null)
            return false;

        claim.Status = "PickedUp";

        await _context.SaveChangesAsync();

        return true;
    }
}