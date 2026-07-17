using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Transaction 
    {
        public int Id { get; set; }
        public string? Description {get; set; }
        public double Value { get; set; }
        public  TransactionType Type { get; set; }
        //FK to find users by Id
        public int UserId {get; set; }
        [ForeignKey("UserId")]
        public Users? Users {get; set; }

        // empty constructor
        public Transaction(){}


        public Transaction(string description, double value, TransactionType type)
        {
            Description = description;
            Value = value;
            Type = type;
        }

    }
}