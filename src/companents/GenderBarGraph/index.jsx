import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import excelFile from "../../data/data.xlsx";
import * as XLSX from 'xlsx';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function GenderBarChart() {
  const [genderCounts, setGenderCounts] = useState({});

  useEffect(() => {
    fetch(excelFile)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        const genderDistribution = {
          "Qadın": 0,
          "Kişi": 0,
        };

        parsedData.forEach(row => {
          const gender = row["Cinsi"];
          if (genderDistribution.hasOwnProperty(gender)) {
            genderDistribution[gender]++;
          }
        });

        setGenderCounts(genderDistribution);
      });

  }, []);

  const genderCategories = ["Qadın", "Kişi"];

  const chartData = {
    labels: genderCategories,
    datasets: [
      {
        label: "Gender Distribution",
        data: genderCategories.map(category => genderCounts[category] || 0),
        backgroundColor: ['#953E3E', '#7578A7'], 
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
          text: 'Gender Categories',
        },
      },
    },
  };

  return (
    <div className="gender-graph">
      <h3 className="name-graph">Gender Distribution</h3>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default GenderBarChart;
