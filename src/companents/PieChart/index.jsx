import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import excelFile from "../../data/data.xlsx"
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

function PieChart() {
  const [internData, setInternData] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});


  useEffect(() => {
      fetch(excelFile)
        .then((response) => response.arrayBuffer())
        .then((data) => {
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet);
          const dataWithId = parsedData.map((row, index) => ({
              ...row,
              id: index + 1
            }));
          setInternData(dataWithId);
        });
        
    }, []);


    useEffect(() => {
      const filteredData = internData.filter(row => {
        const category = row['Şöbə'];
        return ['İT(Web)', 'İT(Rəqəmsal marketing)', 'HR', 'Mühasibatlıq', 'İnşaat Mühəndisliyi', 'Logistika/Satınalma'].includes(category);
      });
  
      const counts = {};
      filteredData.forEach(row => {
        const category = row['Şöbə'];
        counts[category] = (counts[category] || 0) + 1;
      });
  
      setCategoryCounts(counts);
    }, [internData]);

    const chartData = {
      labels: Object.keys(categoryCounts),
      datasets: [
        {
          data: Object.values(categoryCounts),
          backgroundColor: [
            '#6D6FAB', 
            '#303274', 
            '#953E3E', 
            '#7578A7', 
            '#1D1F6D', 
            '#953E7A'
          ],
        },
      ],
    };
    const chartOptions = {
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const category = chartData.labels[context.dataIndex];
              const value = chartData.datasets[0].data[context.dataIndex];
              return `${category}: ${value} rows`;
            },
          },
        },
      },
    };
  return (
    <div>
        <h3 className="name-graph">Department Distribution</h3>
         <Pie data={chartData}  options={chartOptions}/>
    </div>
  )
}

export default PieChart