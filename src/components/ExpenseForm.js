import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

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

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Amount" 
      />
      <input 
        type="text" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        placeholder="Category" 
      />
      <input 
        type="text" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
