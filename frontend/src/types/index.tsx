//Map the enum to be equals to the backend
export enum TransactionType {
    Income = 0,
    Expense = 1     
}


// Set interface for a transaction request
export interface TransactionRequest {
    description: string;
    value: number;
    type: TransactionType;
    userId: number;
}


//Set interface for a user request
export interface UserRequest{
    name: string;
    age: number;
}


// Set interface for a user response
export interface UserReponse{
    id: number;
    name: string;
    age: number;
    userList: any[];
}


// Set response for one user with his transactions
export interface UserReport{
    id: number,
    name: string;
    income: number;
    expenses: number;
    netBalance: number;
}


// Set the response for the Fiancial report of the house
export interface FinancialReportResponse{
    usersList: UserReport[];
    totalIncome: number;
    totalExpenses: number;
    totalNetBalance: number;
}