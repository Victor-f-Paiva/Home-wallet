import type {UserRequest, TransactionRequest, FinancialReportResponse, UserReponse} from '../types/index';

const BASE_URL = 'http://localhost:5233';


// POST USER
export const apiService = {
  async createUser(data: UserRequest): Promise<any> {
    const response = await fetch(`${BASE_URL}/Users`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error to create a new User');
    return response.json();
  },

  //DELETE USER
  async deleteUser(id: number): Promise<any> {
    const response = await fetch(`${BASE_URL}/Users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error to delete an user');
    return response.status === 204 ? null : response.json();
  },

  // POST TRANSACTION
  async createTransaction(data: TransactionRequest): Promise<any> {
    const response = await fetch(`${BASE_URL}/Transaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error to create a new transaction');
    return response.json();
  },

  //GET HOME REPORT
  async getFinancialReport(): Promise<FinancialReportResponse> {
    const response = await fetch(`${BASE_URL}/Users/HouseExpenses`);
    if (!response.ok) throw new Error('Error to find the report');
    return response.json();
  },

  // GET USER
  async getUsers(): Promise<UserReponse[]> {
    const response = await fetch(`${BASE_URL}/Users`);
    if (!response.ok) throw new Error('Error to find Users list');
    return response.json();
  }
};