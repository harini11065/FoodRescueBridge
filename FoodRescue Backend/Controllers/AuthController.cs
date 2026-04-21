using FoodRescue_Backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace FoodRescue_Backend.Controllers
{
    [ApiController]
    [Route("api/auth")]

    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == dto.Email && u.Password == dto.Password);

            if (user == null)
                return Unauthorized("Invalid credentials");

            // TODO: Replace with real JWT generation
            var token = "mock-jwt-token";

            return Ok(new
            {
                token,
                user.UserId,
                user.Role
            });
        }
}
