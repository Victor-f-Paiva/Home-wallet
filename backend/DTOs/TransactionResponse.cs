using backend.Models;

namespace backend.DTOs
{
    public record TransactionResponse (int id, string description, double value, string type, int userId);
}