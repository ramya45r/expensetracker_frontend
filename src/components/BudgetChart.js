import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const BudgetChart = ({ expenses, budget }) => {
  const data = {
    labels: expenses.map(exp => exp.category),
    datasets: [{
      data: expenses.map(exp => exp.amount),
      backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'],
    }],
  };

  return (
    <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
      <h3>Budget Visualization</h3>
      <Pie data={data} />
    </div>
  );
};

export default BudgetChart;
