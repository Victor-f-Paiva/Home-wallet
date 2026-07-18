using backend.Models;

namespace backend.DTOs
{
    /// <summary>
    /// Represents the required atributes to create a transaction
    /// </summary>
    /// <param name="description">Description of the transaction</param>
    /// <param name="value">The value of the transaction</param>
    /// <param name="type">The type of the transaction (Income/Expense)</param>
    /// <param name="userId">The Id of User that mad the transaction</param>
    public record TransactionRequest (string description, double value, TransactionType type, int userId);
}