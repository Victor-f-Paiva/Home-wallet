# Home-wallet 🏠💸
A Web API developed in .NET Core with a React + TypeScript + CSS front-end, designed for household financial management. 
The system allows users to be registered and deleted, financial transactions (incomes or expenses) to be linked to users, and provides a household financial report with consolidated totals (overall total across all members, including total income, total expenses, and net balance).

---

## Technologies Used

* **Architecture:** Minimal APIs
* **AspNetCore:** version 8.0.29
* **EntityFrameworkCore:** version 8.0.29
* **EntityFrameworkCore.Design:** version 8.0.29
* **EntityFrameworkCore.Sqlite:** version 8.0.29
* **VITE:** version 8.1.5

---

## Implemented Business Rules

1. **Entity Structure:** A user must strictly contain an `Id`, `Name`, and `Age`. A user can have multiple financial transactions (1:N relationship). Each transaction must contain an `Id`, `Description`, `Value`, `Type` (income or expense), and a `UserId`—which must already exist in the users table to be successfully created.
2. **Age Verification Rule:** Users under the age of 18 **are not allowed** to register `Income` transactions; they can only register `Expense` transactions. Any attempt to register an income under 18 will cause the API to return an HTTP `400 Bad Request`.
3. **Consolidated Report:** The `/Users/HouseExpenses` endpoint processes the calculations, returning all registered individuals alongside their respective revenues, expenses, and balances (income – expense), as well as the overall household total, including total revenue, total expenses, and net balance.

---

## Challenges and Learnings

- Creating `Requests` to map and filter incoming request data, ensuring inputs are valid and preventing direct exposure of database entities over the network.
- Using the `--minimal` flag when creating the .NET Web API, which eliminates the need for standard `Controllers` and allows endpoints to be mapped directly within the main file.
- Understanding that, unlike Java, entities cannot have `private` attributes, otherwise EF Core will fail to read and persist the objects.
- Learning that, unlike Java—which relies heavily on annotations to merge tables (defining primary keys and foreign keys)—.NET Minimal APIs do not require annotations on the `User` entity's `Transactions` list attribute to establish the relationship between entities.
- Leveraging `async` and `await` patterns to prevent request queuing. While the database processes a query, the application remains responsive to handle other incoming requests.
- Realizing the need to create a `TransactionResponse` class to prevent the API response from falling into an infinite loop within the transactions list nested inside the `Users` entity.
- Working with asynchronous database return types, which require a `Task<List<T>>` structure instead of a standard `List<T>`.
- Understanding how a detached frontend interface operates alongside a backend. Since this was my first time wiring both parts together, it was a valuable experience learning how to interconnect the frontend and backend ecosystems.

---

## Images
![alt text](image.png)
![alt text](image-1.png)

---

## How to Run the Project

### Prerequisites
* [.NET SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) installed on your machine.
* [Node.js](https://nodejs.org/en/download) installed on your machine.
* A Web Browser (Chrome, Edge, Firefox, Brave) to view the dashboard.

### Step-by-Step Guide

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Victor-f-Paiva/Home-wallet.git](https://github.com/Victor-f-Paiva/Home-wallet.git)

2. **Navigate to the backend directory:**
   ```bash
   cd Home-wallet/backend

3. **Restore project dependencies:**
   ```bash
   dotnet restore
   
4. **Run the database migrations:**
   ```bash
   dotnet ef database update

5. **Start the backend application:**
   ```bash
   dotnet run

6. **Open a new terminal and navigate to the frontend directory:**
   ```bash
   cd Home-wallet/frontend

7. **Install frontend dependencies and start the development server:**
   ```bash
   npm install
   npm run dev

8. **Open your browser and access the local development URL:**
   ```bash
   http://localhost:5173/
---
## Contact
- **LinkedIn** | [linkedin.com/in/victor-paiva](https://www.linkedin.com/in/victor-paiva-b4392ab7/) 
- **GitHub** | [github.com/Victor-f-Paiva](https://github.com/Victor-f-Paiva) 
- **E-mail** | [victor_eduardof@hotmail.com](mailto:victor_eduardof@hotmail.com) 