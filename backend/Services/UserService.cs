using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    /// <summary>
    /// Serves as the logic of the financial report of House Expenses that will be given for the user
    /// </summary>
    public class UserService
    {
        //Injection to access users and transactions
        private readonly AppDbContext _context;


        //constructor made to fill as non null value of the context
        public UserService(AppDbContext context)
        {
            _context = context;
        }


        /// <summary>
        /// Business Rules:
        /// <remarks>
        /// - List all users registered, 
        /// - Show the total of income, expenses and balance (income - expenses) of each user
        /// - At the end, must be showned the total of income, expenses and net balance.
        /// Generates a financial report of all expenses, income and net balance of the House
        /// </remarks>
        /// </summary>
        /// <returns>A financial report of <see cref="FinancialReportResponse"/></returns>
        public async Task<FinancialReportResponse> GetHouseExpenses()
        {
            //attributes that shall be returned as a new Financial Report of the house
            List<UserReport> userReportsList = new List<UserReport>();
            double totalIncome=0;
            double totalExpenses= 0;
            double TotalNetBalance = 0;

            //defining the list of users making a LEFT JOIN (.Include()) with UsersTable and TransactionsTable
            List<Users> listOfUsers = await _context.UsersTable
            .Include(u => u.Transactions).ToListAsync();
            
            foreach (var user in listOfUsers)
            {
                // discovering the income, expense, net balance and sum to the total
                //type 0=Income; 1= Expense
                double income = user.Transactions
                .Where(t => t.Type == TransactionType.Income)
                .Sum(t =>t.Value);

                double expenses = user.Transactions
                .Where(t => t.Type == TransactionType.Expense)
                .Sum(t => t.Value);

                double netBalance = income - expenses;
                totalIncome += income;
                totalExpenses += expenses;
                TotalNetBalance += netBalance;

                // add to the UserReportList
                //UserReport (int id, string name, double income, double expenses, double netBalance);
                userReportsList.Add(new UserReport(user.Id, user.Name, income, expenses, netBalance));
                
            }

            return new FinancialReportResponse(userReportsList,totalIncome, totalExpenses, TotalNetBalance);
        }
    }
}