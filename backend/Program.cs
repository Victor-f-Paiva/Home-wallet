using backend.Data;
using backend.Routes;
using backend.Services;
using Microsoft.EntityFrameworkCore;



var builder = WebApplication.CreateBuilder(args);
// Add port 5173, to run react app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
    policy => policy.WithOrigins("http://localhost:5173")
    .AllowAnyHeader()
    .AllowAnyMethod());
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Register UserServices into DI
builder.Services.AddScoped<UserService>();

// Configuring AppDbContexto to use SQLite and the DB
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source= HomeWallet.sqlite"));

var app = builder.Build();
// activating CORS
app.UseCors("AllowReact");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Routes for Users and Transaction
UsersRoute.UsersRoutes(app);
TransactionRoutes.TransactionRoute(app);


app.UseHttpsRedirection();
app.Run();
