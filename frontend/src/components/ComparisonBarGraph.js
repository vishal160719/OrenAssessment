
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';



ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ComparisonBarGraph = () => {
  const [chartData, setChartData] = useState({
    labels: ['Carbon Emissions', 'Water Usage', 'Waste Generated'],
    datasets: [
      {
        label: '2020',
        data: [0, 0, 0], 
        backgroundColor: 'rgba(255, 99, 132, 0.6)', 
      },
      {
        label: '2024',
        data: [0, 0, 0], 
        backgroundColor: 'rgba(54, 162, 235, 0.6)', 
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const responseInputs = await fetch('http://localhost:5000/api/inputs');
        const responseDummy = await fetch('http://localhost:5000/api/dummy');

        
        if (!responseInputs.ok || !responseDummy.ok) {
          throw new Error(`Error fetching data: ${responseInputs.status} and ${responseDummy.status}`);
        }

        const inputsData = await responseInputs.json();
        const dummyData = await responseDummy.json();

       
        console.log('Fetched inputs data:', inputsData);
        console.log('Fetched dummy data:', dummyData);

        
        if (!inputsData.data || !Array.isArray(inputsData.data) || inputsData.data.length === 0) {
          throw new Error('Invalid data structure in inputsData');
        }

        
        const lastEntry = inputsData.data[inputsData.data.length - 1];
        const carbonEmissionsLatest = lastEntry.carbonEmissions || 0;
        const waterUsageLatest = lastEntry.waterUsage || 0;
        const wasteGeneratedLatest = lastEntry.wasteGenerated || 0;

        const carbonEmissions = dummyData.map(item => item.carbonEmissions);
        const waterUsage = dummyData.map(item => item.waterUsage);
        const wasteGenerated = dummyData.map(item => item.wasteGenerated);

        setChartData({
          labels: ['Carbon Emissions', 'Water Usage', 'Waste Generated'],
          datasets: [
            {
              label: '2020',
              data: [carbonEmissions, waterUsage, wasteGenerated],
              backgroundColor: 'rgba(255, 99, 132, 0.6)', 
            },
            {
              label: '2024',
              data: [carbonEmissionsLatest, waterUsageLatest, wasteGeneratedLatest],
              backgroundColor: 'rgba(54, 162, 235, 0.6)', 
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Comparison of Environmental Impact (2020 vs 2024)',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Environmental Metrics',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Values',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '70%', height: '400px', margin: 'auto' }}>
      <h2>Environmental Impact Comparison</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ComparisonBarGraph;
