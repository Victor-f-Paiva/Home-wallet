using backend.Models;

namespace backend.DTOs
{
    public record TransactionRequest (string description, double value, TransactionType type, int userId);
}