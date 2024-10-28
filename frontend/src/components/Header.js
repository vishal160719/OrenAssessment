import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import '../styles/header.css'

function Header() {
  const [chartData, setChartData] = useState(null); 

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
              data: [carbonEmissions[0] || 0, waterUsage[0] || 0, wasteGenerated[0] || 0],
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

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Sustainability Dashboard', 10, 10);

    if (chartData) {
      
      doc.autoTable({
        head: [['Metric', '2020', '2024']],
        body: [
          ['Carbon Emissions', chartData.datasets[0].data[0], chartData.datasets[1].data[0]],
          ['Water Usage', chartData.datasets[0].data[1], chartData.datasets[1].data[1]],
          ['Waste Generated', chartData.datasets[0].data[2], chartData.datasets[1].data[2]],
        ],
      });
    }

    doc.save('sustainability_dashboard.pdf');
  };

  const exportCSV = () => {
    if (chartData) {
      const csvRows = [
        ['Metric', '2020', '2024'], 
        ['Carbon Emissions', chartData.datasets[0].data[0], chartData.datasets[1].data[0]],
        ['Water Usage', chartData.datasets[0].data[1], chartData.datasets[1].data[1]],
        ['Waste Generated', chartData.datasets[0].data[2], chartData.datasets[1].data[2]],
      ];

      const csvContent = csvRows.map(e => e.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'sustainability_dashboard.csv');
    }
  };

  return (
    <header className="header">
      <h1>Sustainability Dashboard</h1>
      <button onClick={exportPDF}>Export as PDF</button>
      <button onClick={exportCSV}>Export Data as CSV</button>
    </header>
  );
}

export default Header;
