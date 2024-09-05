import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BudgetChart from './BudgetChart';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/expenses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExpenses(res.data);
        setBudget(res.data.budget);
      } catch (err) {
        console.error('Error fetching expenses:', err);
      }
    };

    fetchData();
  }, []);

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const convertToSelectedCurrency = (amount) => {
    return (amount * exchangeRate).toFixed(2);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const categoryMatch = !selectedCategory || expense.category === selectedCategory;
    const dateMatch = (!startDate || new Date(expense.date) >= new Date(startDate)) &&
                      (!endDate || new Date(expense.date) <= new Date(endDate));
    return categoryMatch && dateMatch;
  });

  const handleDelete = async (expenseId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(expenses.filter(expense => expense._id !== expenseId));
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Expense Dashboard</h2>
      <div className="currency-select">
        <label htmlFor="currency">Select Currency: </label>
        <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          {/* Add more currencies as needed */}
        </select>
      </div>
      <BudgetChart expenses={expenses} budget={budget} />
      <h3>Expense Filters</h3>
      <div className="category-select">
        <label htmlFor="category">Category: </label>
        <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          {/* Replace with actual categories if available */}
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Travel">Travel</option>
          <option value="Transportation">Transportation</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="date-filters">
        <div>
          <label htmlFor="startDate">Start Date: </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date: </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <h3>Expense History</h3>
      <ul className="expense-history">
        {filteredExpenses.map((expense) => (
          <li className="expense-item" key={expense._id}>
            {expense.category}: ${convertToSelectedCurrency(expense.amount)} on {new Date(expense.date).toLocaleDateString()}
            <button className="delete-button" onClick={() => handleDelete(expense._id)}>
              Delete
            </button>
            <button className="delete-button" onClick={() => handleDelete(expense._id)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
