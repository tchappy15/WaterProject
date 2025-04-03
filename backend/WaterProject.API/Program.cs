using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WaterProject.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<WaterDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("WaterConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "https://agreeable-grass-0d150651e.6.azurestaticapps.net")
                .AllowCredentials() //so that cookies will get added
                .AllowAnyHeader() 
                .AllowAnyMethod();
        }
        );

}

); //Cors allows us to get requests from specific origins

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend"); //make sure this is BELOW useHTTPSredirection() 

app.UseAuthorization();

app.MapControllers();

app.Run();
