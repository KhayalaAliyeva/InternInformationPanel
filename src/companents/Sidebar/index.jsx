import React, { useState } from 'react';

import { NavLink, Link } from 'react-router-dom';
// icons
import {
    FaBars,
    FaTruckMoving,
    FaHome,
    FaPeopleArrows,
    FaCalculator
}from "react-icons/fa";
import { BsFillMegaphoneFill,
        BsFillPeopleFill,
        BsGlobe2,
        BsFillCalendarEventFill} from "react-icons/bs";
import { LuConstruction } from "react-icons/lu";
// image
import Logo from "../../images/buta-logo.png"



import "./index.scss";

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon: <FaHome/>
        },
        {
            path:"/calendar",
            name:"Calendar",
            icon:<BsFillCalendarEventFill/>
        },
        {
            path:"/all-interns",
            name:"All Interns",
            icon: <FaPeopleArrows/>
        },
        {
            path:"/marketing",
            name:"Digital Marketing",
            icon:<BsFillMegaphoneFill/>
        },
        {
            path:"/hr",
            name:"Human resources",
            icon:<BsFillPeopleFill/>
        },
        {
            path:"/accounting",
            name:"Accounting ",
            icon:<FaCalculator/>
        },
        {
            path:"/web",
            name:"IT-Web Development",
            icon:<BsGlobe2/>
        },
        {
            path:"/constructionEngineering",
            name:"Road-Construction Engineering",
            icon:<LuConstruction/>
        },
        {
            path:"/purchasing",
            name:"Logistics/Purchasing ",
            icon:<FaTruckMoving/>
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "25%" : "3%"}} className="sidebar">
               <div className="top_section">
                   <figure style={{display: isOpen ? "block" : "none"}} className="logo">
                    <Link to="/">
                            <img src={Logo} alt="logo" className="logo-img"/>
                    </Link>
                   </figure>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" active="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main style={{width: isOpen ? "75%" : "97%"}}>{children}</main>
        </div>
    );
};

export default Sidebar;