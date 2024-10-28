import React, { useState } from 'react';
import '../styles/inputForm.css';

const InputForm = () => {
  const [formData, setFormData] = useState({
    carbonEmissions: '',
    waterUsage: '',
    wasteGenerated: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/inputs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data); 

      localStorage.setItem('latestInputId', data.id);

      setFormData({
        carbonEmissions: '',
        waterUsage: '',
        wasteGenerated: ''
      });

      window.location.reload(); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="wrapper">
        <div className="container">
          <div className="title">Metrices</div>

          <div className="input-form">
            <div className="section-1">
              <div className="items">
                <label className="label">Carbon Emissions</label>
                <input
                  type="text"
                  name="carbonEmissions"
                  className="input"
                  maxLength="16"
                  placeholder="Enter carbon emissions"
                  value={formData.carbonEmissions}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="section-2">
              <div className="items">
                <label className="label">Water Usage</label>
                <input
                  type="text"
                  name="waterUsage"
                  className="input"
                  placeholder="Enter water usage"
                  value={formData.waterUsage}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="section-3">
              <div className="items">
                <label className="label">Waste Generated</label>
                <input
                  type="text"
                  name="wasteGenerated"
                  className="input"
                  placeholder="Enter waste generated"
                  value={formData.wasteGenerated}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="btn" onClick={handleSubmit}>Proceed</div>
        </div>
      </div>
    </form>
  );
};

export default InputForm;
