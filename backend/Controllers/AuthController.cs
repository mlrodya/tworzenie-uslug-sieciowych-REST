using Microsoft.AspNetCore.Mvc;
using AuctionSystem.API.Data;
using AuctionSystem.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AuctionSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User userDto)
        {
            // Na razie uproszczona rejestracja - czysty zapis do bazy
            // Jutro dodamy sprawdzanie czy mail istnieje i szyfrowanie hasła!
            
            var newUser = new User
            {
                Username = userDto.Username,
                Email = userDto.Email,
                PasswordHash = userDto.PasswordHash, // tymczasowo czysty tekst
                Role = "User"
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Użytkownik zarejestrowany pomyślnie!" });
        }
    }
}