namespace backend.Models
{
    /// <summary>
    /// Represents the user of a domestic income control
    /// </summary>
    /// <remarks>
    /// Business Rules:
    /// - Users must have an Id, Name, and Age.
    /// - A user should be able to hold multiple transactions.
    /// </remarks>
    public class Users
    {
        public int Id { get; init; }
        public string Name{get; set; } = null!;
        public int Age { get; set; }

        /// <summary>
        /// Propertie that allow one user have many transactions
        /// </summary>
        public ICollection<Transaction> Transactions{get; set;} = new List<Transaction>();


        /// <summary>
        /// Standart constructor
        /// </summary>
        public Users(){}


        /// <summary>
        /// Inicialize a new instance of class
        /// </summary>
        /// <param name="name">Name of the user</param>
        /// <param name="age">Age of the user</param>
        public Users(string name, int age)
        {
            Name = name;
            Age = age;
        }
    }
}