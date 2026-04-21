using System.Security.Claims;
using System.ComponentModel.DataAnnotations;

namespace FoodRescue_Backend.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }

        
    }
}
