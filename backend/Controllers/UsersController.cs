using Microsoft.AspNetCore.Mvc;
using AuctionSystem.API.Data;
using AuctionSystem.API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace AuctionSystem.API.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/users  (lista użytkowników - opcjonalna)
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _context.Users
                .Select(u => new UserResponseDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    Role = u.Role
                })
                .ToListAsync();

            return Ok(users);
        }

        // GET api/users/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "Użytkownik nie został znaleziony." });

            return Ok(new UserResponseDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role
            });
        }

        // PUT api/users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateUserDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "Użytkownik nie został znaleziony." });

            // sprawdzenie, czy nowy e-mail nie jest zajęty przez kogoś innego
            var emailTaken = await _context.Users
                .AnyAsync(u => u.Email == dto.Email && u.Id != id);
            if (emailTaken)
                return BadRequest(new { message = "Ten adres e-mail jest już zajęty!" });

            user.Username = dto.Username;
            user.Email = dto.Email;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE api/users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "Użytkownik nie został znaleziony." });

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
