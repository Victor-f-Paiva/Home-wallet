using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace backend.Routes
{
    /// <summary>
    /// Class that has the endpoints of Users
    /// </summary> 
    public static class UsersRoute
    {
        public static void UsersRoutes(WebApplication app)
        {
            // making a unchenginble route
            var route = app.MapGroup("Users");

            //POST
            route.MapPost("", 
            async (UsersRequest req, AppDbContext context) =>
            {
                //create an object, add to the schemma, saving it and return a message
                var user = new Users(req.name, req.age);
                await context.AddAsync(user);
                await context.SaveChangesAsync();
                return Results.Created("User family created", user);
            });

            //GET
            route.MapGet("", 
            async (AppDbContext context) =>
            {
                var users_list = await context.UsersTable.ToListAsync();
                return Results.Ok(users_list);
            });

            //GET BY ID
            route.MapGet("/{id}", 
            async (int id, AppDbContext context) =>
            {
                var user = await context.UsersTable.FindAsync(id);
                if (user == null)
                {
                    return Results.NotFound($"User id {id} Not Found");
                }
                return Results.Ok(user);
            });

            //DELETE
            route.MapDelete("/{id}", 
            async (int id, AppDbContext context) =>
            {
                var user = await context.UsersTable.FindAsync(id);
                if (user == null)
                {
                    return Results.NotFound("Family user not found");
                }
                context.UsersTable.Remove(user);
                await context.SaveChangesAsync();
                return Results.Ok($"Family user, id {id}, removed");
            });
        }
    }
}