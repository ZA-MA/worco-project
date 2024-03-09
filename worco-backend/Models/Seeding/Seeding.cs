using cosmetic_project_backend.Controllers;
using worco_backend.Auth;
using worco_backend.Data;

namespace worco_backend.Models.Seeding
{
    public class Seeding
    {
        public static async void Initialize()
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {

                var db = serviceScope.ServiceProvider.GetService<AppDbContext>();

                /*var login1 = db.Login.Where(l => l.email == "admin@worco.ru").FirstOrDefault();
                login1.password = HashHelper.hashPassword("123.Ru");
                db.SaveChanges();*/

                //roles
                if (db.Roles.Where(r => r.role == "Admin").FirstOrDefault() == null)
                {
                    var role = new Role {role = "Admin"};
                    db.Roles.Add(role);
                    db.SaveChanges();
                }
                if (db.Roles.Where(r => r.role == "User").FirstOrDefault() == null)
                {
                    var role = new Role { role = "User" };
                    db.Roles.Add(role);
                    db.SaveChanges();
                }
                if (db.Roles.Where(r => r.role == "Company").FirstOrDefault() == null)
                {
                    var role = new Role { role = "Company" };
                    db.Roles.Add(role);
                    db.SaveChanges();
                }
                if (db.Roles.Where(r => r.role == "Guest").FirstOrDefault() == null)
                {
                    var role = new Role { role = "Guest" };
                    db.Roles.Add(role);
                    db.SaveChanges();
                }

                //Login
                if (db.Login.Where(r => r.email == "admin@worco.ru").FirstOrDefault() == null)
                {
                    var login = new Login 
                    { 
                        email = "admin@worco.ru",
                        password = "123.Ru"
                    };
                    db.Login.Add(login);
                    db.SaveChanges();
                }
                if (db.Login.Where(r => r.email == "max@gmail.com").FirstOrDefault() == null)
                {
                    var login = new Login
                    {
                        email = "max@gmail.com",
                        password = "123.Ru"
                    };
                    db.Login.Add(login);
                    db.SaveChanges();
                }

                //Users
                if (db.Users.Where(r => r.email == "admin@worco.ru").FirstOrDefault() == null)
                {
                    var account = new User
                    {
                        email = "admin@worco.ru",
                        firstName = "Admin",
                        lastName = "Admin",
                        patronymic = "Admin",
                        in_company = false,
                        role = db.Roles.Where(r => r.role == "Admin").FirstOrDefault(),
                        login = db.Login.Where(l => l.email == "admin@worco.ru").FirstOrDefault()
                    };
                    db.Users.Add(account);
                    db.SaveChanges();
                }
                if (db.Users.Where(r => r.email == "max@gmail.com").FirstOrDefault() == null)
                {
                    var account = new User
                    {
                        email = "max@gmail.com",
                        firstName = "Максим",
                        lastName = "Зайцев",
                        patronymic = "Олегович",
                        in_company = false,
                        role = db.Roles.Where(r => r.role == "User").FirstOrDefault(),
                        login = db.Login.Where(l => l.email == "max@gmail.com").FirstOrDefault()
                    };
                    db.Users.Add(account);
                    db.SaveChanges();
                }
            }
        }
    }
}
