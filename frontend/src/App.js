import React, { useState } from 'react';
import './App.css';

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [box, setBox] = useState({
        averageGrade: false,
        studentProgress: false,
        topPerformers: false,
    });

    // Handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Handle checkbox change
    const handleCheckboxChange = (event) => {
        setBox({
            ...box,
            [event.target.name]: event.target.checked,
        });
    };

    // Handle analysis submission
    const handleSubmit = () => {
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      fetch('http://127.0.0.1:8000/api/grades/upload/', {
          method: 'POST',
          body: formData,
      })
      .then(response => response.json())
      .then(data => {
          console.log('Upload successful:', data);
      })
      .catch(error => {
          console.error('Error uploading file:', error);
      });
    };
  

    return (
        <div className="container">
            {/* Header */}
            <div className="header">
                <h1>Class Grade Visualizer</h1>
            </div>

            {/* File Upload Section */}
            <div className="file-upload">
                <h3>Upload Grades CSV:</h3>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    style={{ marginTop: '10px' }}
                />
            </div>

            {/* Checkbox Section */}
            <div className="checkbox-section">
                <h3>Select Analysis Options:</h3>
                <label>
                    <input
                        type="checkbox"
                        checked={box.averageGrade}
                        onChange={handleCheckboxChange}
                        name="averageGrade"
                    />
                    Average Grade Per Assignment
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={box.studentProgress}
                        onChange={handleCheckboxChange}
                        name="studentProgress"
                    />
                    Student Progress Over Time
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={box.topPerformers}
                        onChange={handleCheckboxChange}
                        name="topPerformers"
                    />
                    Top Performers
                </label>
            </div>

            {/* Action Button */}
            <div className="analyze-button">
                <button
                    onClick={handleSubmit}
                    disabled={!selectedFile}
                >
                    Analyze Grades
                </button>
            </div>

            {/* Results Section */}
            <div className="results">
                <h3>Results:</h3>
                <p>No results to display yet.</p>
            </div>
        </div>
    );
}

export default App;
