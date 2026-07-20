import React, { useState } from 'react';
import { apiService } from './services/api';
import {type FinancialReportResponse, TransactionType } from './types/index';
import styles from './App.module.css';

export default function App() {
  // Set the responses and report
  const [report, setReport] = useState<FinancialReportResponse | null>(null);
  const [apiResponse, setApiResponse] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Set the forms for requests
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState<number | ''>('');
  const [deleteUserId, setDeleteUserId] = useState<number | ''>('');

  const [txDesc, setTxDesc] = useState('');
  const [txValue, setTxValue] = useState<number | ''>('');
  const [txType, setTxType] = useState<TransactionType>(TransactionType.Income);
  const [txUserId, setTxUserId] = useState<number | ''>('');

  // show the response from the server
  const logResponse = (action: string, data: any) => {
    setError('');
    setApiResponse(`[${action}] - ${JSON.stringify(data, null, 2)}`);
  };

  const logError = (action: string, err: any) => {
    setApiResponse('');
    setError(`[${action} Error] - ${err.message || err}`);
  };

  // functions to create, delete and request the report
  // POST USER
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || userAge === '') return;
    try {
      const res = await apiService.createUser({ name: userName, age: Number(userAge) });
      logResponse('Create a new User', res);
      setUserName('');
      setUserAge('');
      handleFetchReport(); 
    } catch (err) {
      logError('Create a new User', err);
    }
  };


  //DELETE USER
  const handleDeleteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteUserId === '') return;
    try {
      const res = await apiService.deleteUser(Number(deleteUserId));
      logResponse('Delete User', res || { success: true, message: `Family user, id ${deleteUserId} removed` });
      setDeleteUserId('');
      handleFetchReport();
    } catch (err) {
      logError('Delete User', err);
    }
  };


  // POST TRANSACTION
  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txDesc || txValue === '' || txUserId === '') return;
    try {
      const res = await apiService.createTransaction({
        description: txDesc,
        value: Number(txValue),
        type: txType,
        userId: Number(txUserId)
      });
      logResponse('Create a new Transaction', res);
      setTxDesc('');
      setTxValue('');
      setTxUserId('');
      handleFetchReport();
    } catch (err) {
      logError('Create a new Transaction', err);
    }
  };


  //GET ALL USERS WITH TRANSACTIONS
  const handleFetchReport = async () => {
    try {
      const data = await apiService.getFinancialReport();
      setReport(data);
      logResponse('Home Expenses Report', data);
    } catch (err) {
      logError('Home Expenses Report', err);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
      </header>

      <div className={styles.grid}>
        {/* BUTTONS */}
        <section className={styles.card}>
          <h2>Home Wallet Options</h2>
          
          <div className={styles.actionsGroup}>
            {/* 1. CREATE USER */}
            <form onSubmit={handleCreateUser} className={styles.formBox}>
              <h3>Create a new User</h3>
              <input type="text" placeholder="Nome" value={userName} onChange={e => setUserName(e.target.value)} required />
              <input type="number" placeholder="Idade" value={userAge} onChange={e => setUserAge(e.target.value ? Number(e.target.value) : '')} required />
              <button type="submit" className={styles.btnSuccess}>Create User</button>
            </form>

            {/* 2. DELETE USER */}
            <form onSubmit={handleDeleteUser} className={styles.formBox}>
              <h3>Delete an User</h3>
              <input type="number" placeholder="ID do Usuário" value={deleteUserId} onChange={e => setDeleteUserId(e.target.value ? Number(e.target.value) : '')} required />
              <button type="submit" className={styles.btnDanger}>Delete User</button>
            </form>

            {/* 3. CREATE TRANSACTIO */}
            <form onSubmit={handleCreateTransaction} className={styles.formBox}>
              <h3>Create a new Transaction</h3>
              <input type="text" placeholder="Descrição" value={txDesc} onChange={e => setTxDesc(e.target.value)} required />
              <input type="number" step="0.01" placeholder="Valor" value={txValue} onChange={e => setTxValue(e.target.value ? Number(e.target.value) : '')} required />
              <input type="number" placeholder="User ID responsible for it" value={txUserId} onChange={e => setTxUserId(e.target.value ? Number(e.target.value) : '')} required />
              <select value={txType} onChange={e => setTxType(Number(e.target.value))}>
                <option value={TransactionType.Income}>Income (0)</option>
                <option value={TransactionType.Expense}>Expense (1)</option>
              </select>
              <button type="submit" className={styles.btnPrimary}>Create Transaction</button>
            </form>

            {/* 4. GET REPORT */}
            <div className={styles.formBox}>
              <h3>Home Report</h3>
              <button type="button" onClick={handleFetchReport} className={styles.btnInfo}>
                Report
              </button>
            </div>
          </div>
        </section>


        {/* Raw response from backend */}
        <section className={styles.card}>
          <h2>Console with JSON response</h2>
          {apiResponse && <pre className={styles.logSuccess}>{apiResponse}</pre>}
          {error && <pre className={styles.logError}>{error}</pre>}
          {!apiResponse && !error && <p className={styles.placeholder}>Nenhuma ação executada ainda.</p>}
        </section>
      </div>


      {/* Visual for HomeExpenses Report */}
      {report && (
        <section className={`${styles.card} ${styles.reportSection}`}>
          <h2>Home Expenses</h2>
          
          <div className={styles.metrics}>
            <div className={styles.metricBox}>
              <span>House Incomes</span>
              <p className={styles.incomeText}>R$ {report.totalIncome.toFixed(2)}</p>
            </div>
            <div className={styles.metricBox}>
              <span>House Expenses</span>
              <p className={styles.expenseText}>R$ {report.totalExpenses.toFixed(2)}</p>
            </div>
            <div className={styles.metricBox}>
              <span>House Net Balance</span>
              <p className={report.totalNetBalance >= 0 ? styles.incomeText : styles.expenseText}>
                R$ {report.totalNetBalance.toFixed(2)}
              </p>
            </div>
          </div>

          <h3>Financial Report for User</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Income (0)</th>
                <th>Expenses (1)</th>
                <th>Net Balance</th>
              </tr>
            </thead>
            <tbody>
              {report.usersList.map(user => (
                <tr key={user.id}>
                  <td><code>{user.id}</code></td>
                  <td>{user.name}</td>
                  <td className={styles.incomeText}>+R$ {user.income.toFixed(2)}</td>
                  <td className={styles.expenseText}>-R$ {user.expenses.toFixed(2)}</td>
                  <td className={user.netBalance >= 0 ? styles.incomeText : styles.expenseText}>
                    R$ {user.netBalance.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}