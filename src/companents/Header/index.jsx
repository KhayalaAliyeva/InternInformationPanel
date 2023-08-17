import React from 'react'

// icons
import { BsPersonCircle } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";


// style
import './index.scss'

function Header({ signOut }) {
  return (
    <div className="header">
        <div className='header-content'>
        <input
          type="search"
          placeholder="Search..."
          className="search"
        />
        <BsPersonCircle/>
          <FiLogOut onClick={signOut}/>
        </div>
    </div>
  )
}

export default Header