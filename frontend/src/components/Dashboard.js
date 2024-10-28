import React from 'react';
import Header from './Header';
import InputForm from './InputForm';
import PieChart from './PieChart';
import HorizontalBarGraph from './HorizontalBarGraph';
import BarGraph from './BarGraph';
import ComparisonBarGraph from './ComparisonBarGraph';
import '../styles/dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <div className="grid-container">
        <div className="upper-half">
          <div className="grid-item">
            <InputForm />
          </div>
          <div className="grid-item">
            <PieChart />
          </div>
          <div className="grid-item">
            <BarGraph />
          </div>
        </div>


        <div className="lower-half">
          <div className="grid-item">
          <HorizontalBarGraph />
          </div>
          <div className="grid-item">
          <ComparisonBarGraph />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
