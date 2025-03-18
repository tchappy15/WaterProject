using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace WaterProject.API.Data
{
    public class WaterDbContext :DbContext
    {
        public WaterDbContext(DbContextOptions<WaterDbContext> options) : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }
    }
}
