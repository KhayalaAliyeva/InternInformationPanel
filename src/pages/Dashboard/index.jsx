import React from 'react'
import AgeBarGraph from '../../companents/AgeBarGraph'
import GenderBarChart from '../../companents/GenderBarGraph'
import InfoCard from '../../companents/InfoCard'

// companents
import PieChart from '../../companents/PieChart'



// style
import './index.scss'

function Dashboard() {
  return (
    <div className="dashboard_main">
      <h2 className="page_name">Dashboard</h2>
      <InfoCard/>
      <div className="graph-section">
        <div className="bar-graph">
          <AgeBarGraph className="age-bar-graph"/>
          <GenderBarChart className="gender-bar-graph"/>
        </div>
        <PieChart className="pie-chart"/>
      </div>
      
    </div>
  )
}

export default Dashboard