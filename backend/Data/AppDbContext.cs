using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    /// <summary>
    /// Database contexto to the application
    /// </summary>
    public class AppDbContext : DbContext
    {
        /// <summary>
        /// Initialize a new instance of the class
        /// </summary>
        /// <param name="options">Object of type DbContextOptions</param>
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

        /// <summary>
        /// Initialize a schemma with table for users and transactions
        /// </summary>
        public DbSet<Users> UsersTable {get; set; }
        public DbSet<Transaction> TransactionsTable {get; set; }


    }
}