using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public record UserReport (int id, string name, double income, double expenses, double netBalance);
    
    public record FinancialReportResponse(
        List<UserReport> usersList,
        double totalIncome,
        double totalExpenses,
        double totalNetBalance
        );
}