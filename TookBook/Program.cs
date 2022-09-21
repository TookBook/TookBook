using TookBook.Models;
using TookBook.Services;
using TookBook.DbUtils;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

BSONSettings.InitSettings();

// Add services to the container.
// TODO: Remove multiple xService singletons, each one has a connection to the database, which might cause issues?
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));
//builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.g));
builder.Services.AddSingleton<BookService>();
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<CategoryService>();
builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    MongoDBSeeder dbSeed = new();
    dbSeed.LoadBookMockData();
    dbSeed.LoadUserMockData();
    dbSeed.LoadCategoryMockData();
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
