using backend.Models;

namespace backend.Routes
{
    /// <summary>
    /// Class that has the endpoints of Users
    /// </summary> 
    public static class UsersRoute
    {
        public static void UsersRoutes(WebApplication app)
        {
            app.MapGet(pattern:"User", () => new Users("Victor", 31));
        }
    }
}