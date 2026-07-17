using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        //construstor
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

        //schemas
        public DbSet<Users> UsersTable {get; set; }
        public DbSet<Transaction> TransactionsTable {get; set; }


    }
}