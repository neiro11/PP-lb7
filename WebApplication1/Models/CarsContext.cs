using Microsoft.EntityFrameworkCore;

namespace WebApplication3.Models
{
    public class CarsContext : DbContext
    {
        public DbSet<Car> Car { get; set; }
        public CarsContext(DbContextOptions<CarsContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
