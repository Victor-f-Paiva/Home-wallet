using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Routes
{
    public static class TransactionRoutes
    {
        public static void TransactionRoute(WebApplication app)
        {
            // creating a fixed route
            var route = app.MapGroup("Transaction");

            //POST
            route.MapPost("", 
            async (TransactionRequest req, AppDbContext context) =>
            {
                //validating if userIs exists
                var user = await context.UsersTable.FindAsync(req.userId);
                if (user == null)
                {
                    return Results.NotFound($"User with id {req.userId} Not Found");
                }

                //logic that permit under 18 only register expenses.
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