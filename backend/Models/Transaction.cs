using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Transaction 
    {
        public int Id { get; set; }
        public string Description {get; set; }
        public double Value { get; set; }
        public  TransactionType Type { get; set; }
        //FK to find users by Id
        public int UserId {get; set; }
        [ForeignKey("UserId")]
        public Users? Users {get; set; }

        // empty constructor
        public Transaction()
        {
            Description = "";
        }


        public Transaction(string description, double value, TransactionType type, int userId)
        {
            Description = description;
            Value = value;
            Type = type;
            UserId = userId;
        }

    }
}