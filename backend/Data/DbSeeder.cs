using AuctionSystem.API.Models;

namespace AuctionSystem.API.Data
{
    // Wypełnia bazę danymi startowymi, aby aplikacja od razu miała co pokazać.
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            // Demo-użytkownik (login: demo@demo.com / hasło: Password123)
            if (!context.Users.Any())
            {
                context.Users.Add(new User
                {
                    Username = "demo",
                    Email = "demo@demo.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123"),
                    Role = "User"
                });
                context.SaveChanges();
            }

            // Przykładowe aukcje
            if (!context.Auctions.Any())
            {
                var ownerId = context.Users.First().Id;
                var now = DateTime.UtcNow;

                context.Auctions.AddRange(
                    new Auction
                    {
                        Title = "MacBook Pro M3",
                        Description = "Prawie nowy, używany tylko przez studenta IT w niedzielę.",
                        StartingPrice = 4000m,
                        CurrentPrice = 4500m,
                        StartDate = now,
                        EndDate = now.AddDays(7),
                        CategoryId = 1,
                        OwnerId = ownerId,
                        ImageUrl = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400"
                    },
                    new Auction
                    {
                        Title = "Kolekcja komiksów Marvela",
                        Description = "Rzadkie wydania, stan idealny.",
                        StartingPrice = 1000m,
                        CurrentPrice = 1200.50m,
                        StartDate = now,
                        EndDate = now.AddDays(5),
                        CategoryId = 3,
                        OwnerId = ownerId,
                        ImageUrl = "https://images.unsplash.com/photo-1588497859490-85d1c17db96d?q=80&w=400"
                    },
                    new Auction
                    {
                        Title = "Rower Górski Scott",
                        Description = "Przejechał tylko jeden maraton.",
                        StartingPrice = 2500m,
                        CurrentPrice = 2800m,
                        StartDate = now,
                        EndDate = now.AddDays(10),
                        CategoryId = 2,
                        OwnerId = ownerId,
                        ImageUrl = "https://images.unsplash.com/photo-1485965120184-e220f15ef923?q=80&w=400"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
