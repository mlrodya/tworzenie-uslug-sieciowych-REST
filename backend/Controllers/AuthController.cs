using Microsoft.AspNetCore.Mvc;
using AuctionSystem.API.Data;
using AuctionSystem.API.Models;
using AuctionSystem.API.DTOs; 
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuctionSystem.API.Controllers
{
    [ApiController]
    [Route("api/users")] // zgodna z README
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost] // POST api/users - Rejestracja
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            // Sprawdzenie czy e-mail istnieje
            var userExists = await _context.Users.AnyAsync(u => u.Email == dto.Email);
            if (userExists)
            {
                return BadRequest(new { message = "Ten adres e-mail jest już zajęty!" });
            }

            // Szyfrowanie czystego hasła przesłanego z RegisterDto (.Password)
            string securePasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            // dane z DTO na właściwy model bazodanowy User
            var newUser = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = securePasswordHash,
                Role = "User"
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Użytkownik zarejestrowany pomyślnie i bezpiecznie!" });
        }

        [HttpPost("login")] // POST api/users/login - Logowanie
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            // 1. Szukanie użytkownika po mailu z LoginDto (.Email)
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            
            // 2. Weryfikacja czystego hasła z DTO z hashem z bazy za pomocą BCrypt
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Nieprawidłowy e-mail lub hasło!" });
            }

            // 3. GENEROWANIE TOKENU JWT
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("MojeSuperTajneHasloDoGenerowaniaTokenowJWT123!"); 

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // 4. Zwrot czystego tokenu i danych
            return Ok(new {
                message = "Zalogowano pomyślnie!",
                token = tokenString,
                userId = user.Id,
                username = user.Username,
                role = user.Role
            });
        }
    }
}