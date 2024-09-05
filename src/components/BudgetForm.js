import React, { useState } from 'react';
import axios from 'axios';
import BudgetDashboard from './BudgetDashboard';

const BudgetForm = ({ onAddBudget }) => {
  const [category, setCategory] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');

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
    const newBudget = { category, budgetLimit };
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/budgets/', newBudget, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Optionally call onAddBudget to update the parent component
      // onAddBudget(newBudget);
      setCategory('');
      setBudgetLimit('');
    } catch (err) {
      console.error('Error adding budget:', err);
    }
  };

  return (
    <><form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="category">Category</label>
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
          </div>

          <div>
              <label htmlFor="budgetLimit">Budget Limit</label>
              <input
                  type="number"
                  id="budgetLimit"
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(e.target.value)}
                  placeholder="Budget Limit"
                  required />
          </div>

          <button type="submit">Add Budget</button>
      </form><BudgetDashboard /></>
  );
};

export default BudgetForm;
