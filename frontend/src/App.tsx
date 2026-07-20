import React, { useState } from 'react';
import { apiService } from './services/api';
import {type FinancialReportResponse, type UserReponse, TransactionType } from './types/index';
import styles from './App.module.css';
import houseIcon from './assets/house.png';

export default function App() {
  // Set the responses and report
  const [report, setReport] = useState<FinancialReportResponse | null>(null);
  const [userList, setUserList] = useState<UserReponse[] | null>(null); 
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);

  // Alerts to users
  const [alertMessage, setAlertMessage] = useState<{ text: string; isError: boolean } | null>(null);


  // Set the forms for requests
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState<number | ''>('');
  const [deleteUserId, setDeleteUserId] = useState<number | ''>('');

  const [txDesc, setTxDesc] = useState('');
  const [txValue, setTxValue] = useState<number | ''>('');
  const [txType, setTxType] = useState<TransactionType>(TransactionType.Income);
  const [txUserId, setTxUserId] = useState<number | ''>('');

  // show alerts
  const showAlert = (text: string, isError: boolean = false) => {
    setAlertMessage({ text, isError });
    setTimeout(() => setAlertMessage(null), 6000);
  };


  // functions to create, delete and request the report
  // POST USER
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || userAge === '') return;
    try {
      await apiService.createUser({ name: userName, age: Number(userAge) });
      showAlert(`User "${userName}" created successfully!`);
      setUserName('');
      setUserAge('');
      silentUpdateReport(); 
    } catch (err: any) {
      showAlert(err.message || 'Error creating user', true);
    }
  };


  //DELETE USER
  const handleDeleteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteUserId === '') return;
    try {
      await apiService.deleteUser(Number(deleteUserId));
      showAlert(`Family user, id ${deleteUserId} removed`);
      setDeleteUserId('');
      silentUpdateReport();
    } catch (err: any) {
      showAlert(err.message || 'Error deleting user', true);
    }
  };


  // POST TRANSACTION
  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txDesc || txValue === '' || txUserId === '') return;
    try {
        await apiService.createTransaction({
        description: txDesc,
        value: Number(txValue),
        type: txType,
        userId: Number(txUserId)
      });
      showAlert('Transaction recorded successfully!');
      setTxDesc('');
      setTxValue('');
      setTxUserId('');
      silentUpdateReport();
    } catch (err: any) {
      if (txType === TransactionType.Income) {
        showAlert('Users under 18 years old can only register expenses', true);
      } else {
        showAlert(err.message || 'Error on transaction', true);
      }
    }
  };


  //GET ALL USERS WITH TRANSACTIONS
  const handleFetchReport = async () => {
    try {
      const data = await apiService.getFinancialReport();
      setReport(data);
      setIsReportModalOpen(true);
    } catch (err: any) {
      showAlert(err.message || 'Home Expenses Report', true);
    }
  };


  //GET USERS LIST
  const handleFetchUsersList = async () => {
    try {
      const data = await apiService.getUsers();
      setUserList(data); 
      setIsUsersModalOpen(true);
    } catch (err: any) {
      showAlert(err.message || 'Error fetching users list', true);
    }
  };

  // set 
  const silentUpdateReport = async () => {
    try {
      const data = await apiService.getFinancialReport();
      setReport(data);
    } catch {
      // Falha silenciosa em background
    }
  };

return (
    <div className={styles.container}>
      {/* temporary alerts */}
      {alertMessage && (
        <div className={alertMessage.isError ? styles.alertError : styles.alertSuccess}>
          {alertMessage.text}
        </div>
      )}

      <header className={styles.header}>
        <img src={houseIcon} alt="Wallet Logo" className={styles.logo} />
        <h1>Home Wallet</h1>
      </header>

      <div className={styles.grid}>
        <section className={styles.card}>
          <h2>Users</h2>
          
          <div className={styles.actionsGroup}>
            {/* FORM CREATE USER */}
            <form onSubmit={handleCreateUser} className={styles.formBox}>
              <h3>Create a new User</h3>
              <input type="text" placeholder="Name" value={userName} onChange={e => setUserName(e.target.value)} required />
              <input type="number" placeholder="Age" value={userAge} onChange={e => setUserAge(e.target.value ? Number(e.target.value) : '')} required />
              <button type="submit" className={styles.btnDefault}>
                Create User
              </button>
            </form>

            {/* FORM DELETE USER */}
            <form onSubmit={handleDeleteUser} className={styles.formBox}>
              <h3>Delete an User</h3>
              <input type="number" placeholder="User Id" value={deleteUserId} onChange={e => setDeleteUserId(e.target.value ? Number(e.target.value) : '')} required />
              <button type="submit" className={styles.btnDefault}>
                Delete User
              </button>
            </form>
          </div>
        </section>

        <section className={styles.card}>
          <h2>Transactions</h2>

          <div className={styles.actionsGroup}>
            {/* FORM CREATE TRANSACTION */}
            <form onSubmit={handleCreateTransaction} className={styles.formBox}>
              <h3>Create a new Transaction</h3>
              <input type="text" placeholder="Description" value={txDesc} onChange={e => setTxDesc(e.target.value)} required />
              <input type="number" step="0.01" placeholder="Value" value={txValue} onChange={e => setTxValue(e.target.value ? Number(e.target.value) : '')} required />
              <input type="number" placeholder="User ID responsible for it" value={txUserId} onChange={e => setTxUserId(e.target.value ? Number(e.target.value) : '')} required />
              <select value={txType} onChange={e => setTxType(Number(e.target.value))}>
                <option value={TransactionType.Income}>Income </option>
                <option value={TransactionType.Expense}>Expense </option>
              </select>
              <button type="submit" className={styles.btnDefault}>
                Create Transaction
              </button>
            </form>

            {/* GET BUTTON */}
            <div className={styles.buttonRow}>
              <button type="button" onClick={handleFetchUsersList} className={`${styles.btnDefault} ${styles.btnGreen}`}>
                Get Users
              </button>

              <button type="button" onClick={handleFetchReport} className={`${styles.btnDefault} ${styles.btnGreen}`}>
                Report
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* GET USERS LIST WINDOW*/}
      {isUsersModalOpen && userList && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContentSmall}>
            <div className={styles.modalHeader}>
              <h2>System Users</h2>
              <button className={styles.btnClose} onClick={() => setIsUsersModalOpen(false)}>&times;</button>
            </div>
            <div className={styles.modalBody}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map(user => (
                    <tr key={user.id}>
                      <td><code>{user.id}</code></td>
                      <td>{user.name}</td>
                      <td>{user.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* GET HOME EXPENSES REPORT WINDOW */}
      {isReportModalOpen && report && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Home - Financial Report</h2>
              <button className={styles.btnClose} onClick={() => setIsReportModalOpen(false)}>&times;</button>
            </div>
            <div className={styles.modalBody}>
              
              {/* HOME EXPENSES METRICS */}
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

              {/* INDIVIDUAL USER REPORT */}
              <h3 className={styles.sectionSubtitle}>Financial Report by User</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}