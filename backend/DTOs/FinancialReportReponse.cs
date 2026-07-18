namespace backend.DTOs
{
    /// <summary>
    /// Represents the report for one User
    /// </summary>
    /// <param name="id">Id of the user</param>
    /// <param name="name">name of the user</param>
    /// <param name="income">Value of total incomes of the user</param>
    /// <param name="expenses">Value of total expenses of the user</param>
    /// <param name="netBalance">Value of net balance of the user (income - exepenses)</param>
    public record UserReport (int id, string name, double income, double expenses, double netBalance);
    

    /// <summary>
    /// Represents the final report with users and the sum of incomes, expenses and net balance
    /// </summary>
    /// <param name="usersList">List of users containing the user Id, name, total income, expenses and balance</param>
    /// <param name="totalIncome">Sum of all users income</param>
    /// <param name="totalExpenses">Sum of all users expenses</param>
    /// <param name="totalNetBalance">The difference between totalIncome and totalExpenses.</param>
    public record FinancialReportResponse(
        List<UserReport> usersList,
        double totalIncome,
        double totalExpenses,
        double totalNetBalance
        );
}