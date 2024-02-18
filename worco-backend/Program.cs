using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using worco_backend.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using worco_backend.Auth;
using cosmetic_project_backend.Controllers;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevelopClientPermission", policy =>
    {
        policy.AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins("https://localhost:3000")
            .AllowCredentials();


    });
});

/*builder.Services.AddCors(options =>
{
    options.AddPolicy("DevelopClientPermission", policy =>
    {
        policy.WithOrigins("https://localhost/3000");
        policy.AllowAnyMethod();
        policy.AllowAnyHeader();
        policy.AllowCredentials();
        //builder.WithHeaders("accept", "Content-Type: application/json", "https://localhost", "Access-Control-Allow-Credentials: true");
    });
});*/



var connectionString = builder.Configuration.GetConnectionString("MySQLConnection");
builder.Services.AddDbContext<AppDbContext>(options => {
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            // укзывает, будет ли валидироваться издатель при валидации токена
                            ValidateIssuer = true,
                            // строка, представляющая издателя
                            ValidIssuer = AuthOptions.ISSUER,

                            // будет ли валидироваться потребитель токена
                            ValidateAudience = true,
                            // установка потребителя токена
                            ValidAudience = AuthOptions.AUDIENCE,
                            // будет ли валидироваться время существования
                            ValidateLifetime = true,

                            
                            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                            
                            ValidateIssuerSigningKey = true,
                        };
                    });

builder.Services.AddControllersWithViews();
builder.Services.AddAuthorization();
/*builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
                options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
            });*/
var app = builder.Build();

ServiceActivator.Configure(app.Services);

app.UseCors("DevelopClientPermission");
//app.UseMvc();

app.Use(async (context, next) =>
{
    if (context.Request.Cookies.TryGetValue("token", out string? token))
        context.Request.Headers.Authorization = $"Bearer {token}";
    await next();
});

// Configure the HTTP request pipeline.

app.UseDefaultFiles();
app.UseStaticFiles();


app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
