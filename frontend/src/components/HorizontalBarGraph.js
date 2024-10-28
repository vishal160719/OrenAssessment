
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/HorizontalBarGraph.css'; // Create a CSS file for styles


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalBarGraph = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Environmental Impact',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)', 
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dummy');
        const data = await response.json();

       
        console.log('Fetched data:', data);

        
        const labels = data.map(item => item.year);
        const carbonEmissions = data.map(item => item.carbonEmissions);
        const waterUsage = data.map(item => item.waterUsage);
        const wasteGenerated = data.map(item => item.wasteGenerated);

        
        setChartData({
          labels,
          datasets: [
            {
              label: 'Carbon Emissions',
              data: carbonEmissions,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
              label: 'Water Usage',
              data: waterUsage,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
              label: 'Waste Generated',
              data: wasteGenerated,
              backgroundColor: 'rgba(255, 206, 86, 0.6)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Environmental Impact Over Years',
      },
    },
  };

  return (
    <div style={{ width: '80%', height: '60%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default HorizontalBarGraph;
