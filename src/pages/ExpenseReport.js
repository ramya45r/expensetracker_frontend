import React, { useEffect, useState } from 'react';
import { expenseService } from '../services/expenseService';
import { CSVLink } from 'react-csv';

const ExpenseReport = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await expenseService.getExpenses();
        setExpenses(data);
      } catch (err) {
        console.error('Error fetching expenses', err);
      }
    };
    fetchData();
  }, []);

  const csvData = expenses.map(expense => ({
    Date: new Date(expense.date).toLocaleDateString(),
    Amount: expense.amount,
    Category: expense.category,
    Description: expense.description,
  }));

  return (
    <div>
      <h2>Expense Report</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>${expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <CSVLink data={csvData} filename={"expense-report.csv"}>
        <button>Download CSV</button>
      </CSVLink>
    </div>
  );
};

export default ExpenseReport;
