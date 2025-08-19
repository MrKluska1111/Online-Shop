using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Shop.Database
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

            // Tutaj wstaw swój connection string
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=MyShop;Trusted_Connection=True;MultipleActiveResultSets=True");

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
