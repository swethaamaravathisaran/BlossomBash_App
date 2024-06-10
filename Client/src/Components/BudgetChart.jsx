// BudgetChart.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary chart elements and scales
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const BudgetChart = () => {
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getallBudgets');
        if (Array.isArray(response.data)) {
          setBudgetData(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching budget data:', error);
      }
    };

    fetchBudgetData();
  }, []);

  if (!Array.isArray(budgetData)) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: budgetData.map((budget) => budget.EventName),
    datasets: [
      {
        label: 'Total Budget',
        data: budgetData.map((budget) => budget.TotalBudget),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default BudgetChart;
