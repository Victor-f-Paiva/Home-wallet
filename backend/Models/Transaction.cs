using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    /// <summary>
    /// Represents one transaction of each user registered
    /// </summary>
    /// <remarks>
    /// Business Rules:
    /// - Transactions must have an Id, description, value, type(income/expense), userId.
    /// - A user should be able to have multiple transactions.
    /// </remarks>
    public class Transaction 
    {
        public int Id { get; set; }
        public string Description {get; set; }
        public double Value { get; set; }
        public  TransactionType Type { get; set; }
        //FK to find users by Id
        public int UserId {get; set; }

        // Linking the UserId as foreing key of Transaction table
        [ForeignKey("UserId")]
        public Users? Users {get; set; }

        
        /// <summary>
        /// Standart constructor
        /// </summary>
        public Transaction()
        {
            Description = "";
        }


        /// <summary>
        /// Inicialize a new instance of class
        /// </summary>
        /// <param name="description">Description of the Transaction</param>
        /// <param name="value">Value of the Transaction</param>
        /// <param name="type">Type (income/expense) of the Transaction</param>
        /// <param name="userId">User Id to link the Transaction to the user</param>
        public Transaction(string description, double value, TransactionType type, int userId)
        {
            Description = description;
            Value = value;
            Type = type;
            UserId = userId;
        }

    }
}