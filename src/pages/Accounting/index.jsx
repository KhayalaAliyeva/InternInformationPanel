import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import excelFile from "../../data/data.xlsx"
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';



function Accounting() {
  const [internData, setInternData] = useState([]);
  const [filterModel, setFilterModel] = useState({ items: [] });
  const [searchText, setSearchText] = useState('');
  const columns=[
    {field:"Adı", headerName: "Adı", flex:1},
    {field:"Soyadı", headerName: "Soyadı", flex:1},
    {field:"Yaş", headerName: "Yaş", flex:1},
    {field:"Cinsi", headerName: "Cinsi", flex:1},
    {field:"Şöbə", headerName: "Şöbə", flex:1},
    {field:"Universitet", headerName: "Universitet", flex:1},
    {field:"İxtisas", headerName: "İxtisas", flex:1}
]

  useEffect(() => {
   
    fetch(excelFile)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        const itWebFilter = (row) => row['Şöbə'] === "Mühasibatlıq";
        const filteredData = parsedData.filter(itWebFilter);
        const dataWithId = filteredData.map((row, index) => ({
            ...row,
            id: index + 1
          }));
        setInternData(dataWithId);
        console.log(parsedData)
      });
      
  }, []);
  const filteredRows = internData.filter(row => {
    const lowerCaseSearch = searchText.toLowerCase();
    return Object.values(row).some(value =>
      value.toString().toLowerCase().includes(lowerCaseSearch)
    );
  });
  return (
    <div className='department'>  
      <div  className="top-section">
        <h2 className="page-name"> Accounting Department</h2>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search"
        /> 

      </div>
      

    <Box className="table-content">
        <DataGrid
            columns={columns}
            rows={filteredRows}
            filterModel={filterModel}
            onFilterModelChange={(model) => setFilterModel(model)}
            checkboxSelection
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 10,
                },
            },
            }}
            pageSizeOptions={[10, 20, 25, 50]}
            className="datagrid"
        />
    </Box>  
      
    </div>
  );
}

export default Accounting;