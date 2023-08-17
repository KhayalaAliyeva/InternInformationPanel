import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import excelFile from "../../data/data.xlsx"
import * as XLSX from 'xlsx';
import { Chart, registerables} from 'chart.js';
Chart.register(...registerables);





function AgeBarGraph() {
  const [ageCounts, setAgeCounts] = useState({});

  useEffect(() => {
    fetch(excelFile)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        const ageDistribution = {
            "Under 18": 0,
            "18-19": 0,
            "20-21": 0,
            "22-23": 0,
            "24-25": 0,
            "25+": 0,
          };
          parsedData.forEach(row => {
            const age = parseInt(row["Yaş"]);
            if (isNaN(age)) {
              return;
            }
            switch (true) {
                case age < 18:
                  ageDistribution["Under 18"]++;
                  break;
                case age >= 18 && age <= 19:
                  ageDistribution["18-19"]++;
                  break;
                case age >= 20 && age <= 21:
                  ageDistribution["20-21"]++;
                  break;
                case age >= 22 && age <= 23:
                  ageDistribution["22-23"]++;
                  break;
                case age >= 24 && age <= 25:
                  ageDistribution["24-25"]++;
                  break;
                default:
                  ageDistribution["25+"]++;
                  break;
              }
          });
  
          setAgeCounts(ageDistribution);
      });
      
  }, []);

  const ageCategories = ["Under 18", "18-19", "20-21", "22-23", "24-25", "25+"];

  const chartData = {
    labels: ageCategories,
    datasets: [
      {
        label: "Age Distribution",
        data: ageCategories.map(category => ageCounts[category] || 0),
        backgroundColor: '#3E4095',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Age Categories',
        },
      },
    },
  };

  return (
    <div className="age-bar">
      <h3 className="name-graph">Age Distribution</h3>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default AgeBarGraph;
