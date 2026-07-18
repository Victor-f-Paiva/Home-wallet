namespace backend.DTOs
{
    /// <summary>
    /// Represents the Transaction that were made by one user
    /// </summary>
    /// <param name="id">Id of the transaction</param>
    /// <param name="description">Description of the transaction</param>
    /// <param name="value">Value of the Transaction</param>
    /// <param name="type">Type (income/expense) of the Transaction</param>
    /// <param name="userId">User Id to link the Transaction to the user</param>
    public record TransactionResponse (int id, string description, double value, string type, int userId);
}