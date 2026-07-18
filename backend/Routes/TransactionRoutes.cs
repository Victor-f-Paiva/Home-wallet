using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Routes
{
    /// <summary>
    /// Represents the class that maps the endpoints of Transactions
    /// </summary>
    public static class TransactionRoutes
    {
        /// <summary>
        /// Manages the transaction routes
        /// </summary>
        /// <param name="app">Represents the web application to map the routes</param>
        public static void TransactionRoute(WebApplication app)
        {
            // making a route to avoid bolierplate
            var route = app.MapGroup("Transaction");

            //POST
            route.MapPost("", 
            async (TransactionRequest req, AppDbContext context) =>
            {
                // User Id must exists to create a new register
                var user = await context.UsersTable.FindAsync(req.userId);
                if (user == null)
                {
                    return Results.NotFound($"User with id {req.userId} Not Found");
                }

                // Under 18 can only register expenses
                if (user.Age < 18 && req.type == TransactionType.Income)
                {
                    return Results.BadRequest("Users under 18 years old can only register expenses");
                } 

                //creating and saving the transaction
                var transaction = new Transaction(req.description, req.value, req.type, req.userId);
                await context.TransactionsTable.AddAsync(transaction);
                await context.SaveChangesAsync();

                // seting a response
                var response = new TransactionResponse(transaction.Id, transaction.Description, transaction.Value, transaction.Type.ToString(), transaction.UserId);
                return Results.Created($"Transaction created for user id {req.userId}", response);
            });

            //GET
            route.MapGet("",
            async (AppDbContext context) =>
            {
                var transactionsList = await context.TransactionsTable.ToListAsync();
                return Results.Ok(transactionsList);
            });

            //GET BY ID
            route.MapGet("/{id}",
            async (int id, AppDbContext context) =>
            {
                var transaction = await context.TransactionsTable.FindAsync(id);

                //verifying if there is a transaction
                if (transaction == null)
                {
                    return Results.NotFound($"Transactio id {id} Not Found");
                }
                return Results.Ok(transaction);
            });

            //DELETE
            route.MapDelete("/{id}",
            async (int id, AppDbContext context) =>
            {
                var transaction = await context.TransactionsTable.FindAsync(id);

                //verifying if there is the transaction
                if (transaction == null)
                {
                    return Results.NotFound($"Transaction id {id} Not Found");
                }

                //removing and saving
                context.TransactionsTable.Remove(transaction);
                await context.SaveChangesAsync();
                return Results.Ok($"Transaction id {id} Deleted");
            });
        }
    }
}