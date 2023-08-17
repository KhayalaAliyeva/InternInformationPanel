import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import excelFile from "../../data/data.xlsx"
import { Link } from 'react-router-dom';

// icons
import {
    FaTruckMoving,
    FaCalculator
}from "react-icons/fa";
import { BsFillMegaphoneFill,
        BsFillPeopleFill,
        BsGlobe2 } from "react-icons/bs";
import { LuConstruction } from "react-icons/lu";

// style
import "./index.scss"



function InfoCard() {
    const [internData, setInternData] = useState([]);
    const [categoryCounts, setCategoryCounts] = useState({});
    const categoryLogos = {
        'İT(Web)': <BsGlobe2/>,
        'İT(Rəqəmsal marketing)': <BsFillMegaphoneFill/>,
        'HR': <BsFillPeopleFill/>,
        'Mühasibatlıq':<FaCalculator/> ,
        'İnşaat Mühəndisliyi': <LuConstruction/>,
        'Logistika/Satınalma':<FaTruckMoving/>
      };
    const categoryNames = {
        'İT(Web)': "Web development",
        'İT(Rəqəmsal marketing)': "Digital Marketing",
        'HR': "Human Resources",
        'Mühasibatlıq':"Accounting" ,
        'İnşaat Mühəndisliyi': "Construction Engineering",
        'Logistika/Satınalma': 'Logistics/ Purchasing',
      };
    const categotyLinks={
        'İT(Web)': "/web",
        'İT(Rəqəmsal marketing)': "/marketing",
        'HR': "/hr",
        'Mühasibatlıq':"/accounting" ,
        'İnşaat Mühəndisliyi': "/constructionEngineering",
        'Logistika/Satınalma': '/purchasing',
    };

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

    


  return (
    <div className="info-cards">
        {Object.entries(categoryCounts).map(([category, count]) => (
            <div className="info-card" key={category} >
              <Link to={categotyLinks[category]} key={category}>
                <div className="card">
                    <div className="top">
                        <div className="logos">{categoryLogos[category]}</div>
                        <h3 className="category-name">{categoryNames[category]}</h3>
                    </div>
                    <p className="count">{count} interns</p>
                </div>
              </Link>
            </div>
        ))}
    </div>
    
  )
}

export default InfoCard