import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const BudgetChart = ({ expenses, budget }) => {
  // Calculate total expenses and budgets per category
  const categoryData = expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    if (!acc[category]) {
      acc[category] = { totalExpense: 0, budget: 0 };
    }
    acc[category].totalExpense += amount;
    return acc;
  }, {});

  // Add budget data
  Object.keys(budget).forEach(category => {
    if (!categoryData[category]) {
      categoryData[category] = { totalExpense: 0, budget: 0 };
    }
    categoryData[category].budget = budget[category];
  });

  // Prepare data for the chart
  const labels = Object.keys(categoryData);
  const expensesData = labels.map(category => categoryData[category].totalExpense);
  const budgetsData = labels.map(category => categoryData[category].budget);

  // Combine budgets and expenses into a single dataset for visualization
  const data = {
    labels,
    datasets: [
      {
        label: 'Expenses',
        data: expensesData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Budgets',
        data: budgetsData,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      }
    ],
  };

  return (
    <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
      <h3>Expense and Budget Visualization</h3>
      <Pie data={data} />
    </div>
  );
};

export default BudgetChart;
