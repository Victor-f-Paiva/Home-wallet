namespace backend.Models
{
    public class Users
    {
        public int Id { get; init; }
        public string? Name {get; set; }
        public int Age { get; set; }
        // propertie to allow one user have many transactions
        public ICollection<Transaction> Transactions{get; set;} = new List<Transaction>();


        public Users(){}


        public Users(string name, int age)
        {
            Name = name;
            Age = age;
        }
    }
}