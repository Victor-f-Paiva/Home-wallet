using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace backend.Services
{
    public class UserService
    {
        //Injection to access users and transactions
        private readonly AppDbContext _context;


        //constructor to access users and transactions
        public UserService(AppDbContext context)
        {
            _context = context;
        }


        //function that return the list of users with their expenses and the total sum of each
        public async Task<FinancialReportResponse> GetHouseExpenses()
        {
            //attributes that shall be returned as a new Financial Report of the house
            List<UserReport> userReportsList = new List<UserReport>();
            double totalIncome=0;
            double totalExpenses= 0;
            double TotalNetBalance = 0;

            //defining the list of users making a LEFT JOIN with user and transaction tables
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