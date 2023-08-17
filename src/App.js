import React,{useState} from 'react'
import { Routes,Route, Navigate} from "react-router-dom";
// pages
import Dashboard from "./pages/Dashboard";
import AllInterns from "./pages/All-Interns"
import ITWeb from "./pages/IT-Web";
// styles
import './app.scss';
import Sidebar from "./companents/Sidebar"
import Header from "./companents/Header";
import Logistics from "./pages/Logistics";
import HR from "./pages/HR";
import DigitalMarketing from "./pages/DigitalMarketing";
import Accounting from "./pages/Accounting";
import ConstructionEngineering from "./pages/ConstructionEngeneering";
import Calendar from "./pages/Calendar";
import Login from "./pages/Login";


function App() {
  const [auth, setAuth] = useState(true);

  return (
    <div className="app">
    
    <Sidebar>
      <Header signOut={()=>{setAuth(false)}}/>
      <Routes>
      {!auth && (
        <>
        <Route
            path="/login"
            element={<Login authenticate={() => setAuth(true)} />}
          />
        </>
        
      )}
      {auth && (
        <>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/all-interns" element={<AllInterns/>}/>
        <Route path="/web" element={<ITWeb/>}/>
        <Route path="/purchasing" element={<Logistics/>}/>
        <Route path="/hr" element={<HR/>}/>
        <Route path="/marketing" element={<DigitalMarketing/>} />
        <Route path="/accounting" element={<Accounting/>}/>
        <Route path="/constructionEngineering" element={<ConstructionEngineering/>}/>
        </>
      )}
      <Route path="*" element={<Navigate to={
          auth ? "/" : "/login"} />} />

      </Routes>
    </Sidebar>
      
    </div>
    );
}

export default App;
