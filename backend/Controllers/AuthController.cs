using Microsoft.AspNetCore.Mvc;
using AuctionSystem.API.Data;
using AuctionSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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
            var userExists = await _context.Users.AnyAsync(u => u.Email == userDto.Email);
            if (userExists)
            {
                return BadRequest(new { message = "Ten adres e-mail jest już zajęty!" });
            }

            string securePasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.PasswordHash);

            var newUser = new User
            {
                Username = userDto.Username,
                Email = userDto.Email,
                PasswordHash = securePasswordHash,
                Role = "User"
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Użytkownik zarejestrowany pomyślnie i bezpiecznie!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginDto)
        {
            // 1. Szukamy użytkownika po mailu
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            
            // 2. Weryfikacja użytkownika i hasła przez BCrypt
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.PasswordHash, user.PasswordHash))
            {
                return Unauthorized(new { message = "Nieprawidłowy e-mail lub hasło!" });
            }

            // 3. GENEROWANIE TOKENU JWT
            var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            
            // UWAGA: To jest nasz tajny klucz. W produkcji powinien być w appsettings.json!
            // Musi mieć minimum 16-32 znaki.
            var key = Encoding.ASCII.GetBytes("MojeSuperTajneHasloDoGenerowaniaTokenowJWT123!"); 

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                // W tokenie zaszywamy informacje o użytkowniku (Claims)
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7), // Token będzie ważny przez 7 dni
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // 4. Zwracamy token do użytkownika
            return Ok(new { 
                message = "Zalogowano pomyślnie!", 
                token = tokenString,
                username = user.Username, 
                role = user.Role 
            });
        }
    }
}