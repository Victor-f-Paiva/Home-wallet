namespace backend.DTOs
{
    /// <summary>
    /// Represents the required atributes to create a User
    /// </summary>
    /// <param name="name">Name of the user</param>
    /// <param name="age">Age of the user</param>
    public record UsersRequest (string name, int age);

}