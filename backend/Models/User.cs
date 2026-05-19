namespace AuctionSystem.API.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    
    // PasswordHash, bo nigdy nie zapisujemy haseł gołym tekstem!
    public string PasswordHash { get; set; } = string.Empty;
    
    public string Role { get; set; } = "User";
}