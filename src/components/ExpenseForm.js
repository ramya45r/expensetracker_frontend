import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [income, setIncome] = useState('');
  // Define categories (can also fetch from an API or database)
  const categories = [
    'Groceries',
    'Entertainment',
    'Utilities',
    'Transportation',
    'Healthcare',
    'Education',
    'Other'
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = { amount, category, description };
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/expenses', newExpense, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onAddExpense(newExpense);
      setAmount('');
      setCategory('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };
const handleIncome=async ()=>{
    const newExpense = { income };
    const token = localStorage.getItem('token');

    try {
        await axios.post('http://localhost:5000/api/expenses/income', newExpense, {
          headers: { Authorization: `Bearer ${token}` }
        });
       
      } catch (err) {
        console.error(err);
      }
}
  return (
    <>
    <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Income" /><button onClick={handleIncome}>Income</button><form onSubmit={handleSubmit}>
          <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount" />
          <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
              >
                  <option value="">Select Category</option>
                  {categories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                  ))}
              </select>
          <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description" />
          <button type="submit">Add Expense</button>
      </form></>
  );
};

export default ExpenseForm;
