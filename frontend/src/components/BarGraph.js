
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import '../styles/PieChart.css';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['Carbon Emissions', 'Water Usage', 'Waste Generated'],
    datasets: [
      {
        label: 'Environmental Impact',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)', 
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/inputs');
        const data = await response.json();

        
        console.log('Fetched data:', data);

        if (!Array.isArray(data.data) || data.data.length === 0) {
          throw new Error('Data is not an array or is empty');
        }

        
        const lastEntry = data.data[data.data.length - 1];

        const carbonEmissions = lastEntry.carbonEmissions || 0;
        const waterUsage = lastEntry.waterUsage || 0;
        const wasteGenerated = lastEntry.wasteGenerated || 0;


        setChartData(prevState => ({
          ...prevState,
          datasets: [{
            ...prevState.datasets[0],
            data: [carbonEmissions, waterUsage, wasteGenerated],
          }],
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div style={{ width: '70%', height: '300px', margin: 'auto' }}>
      <h2>Vertical Bar Chart Example</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
