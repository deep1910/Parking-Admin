

import React, { useRef, useEffect, useState, useContext } from "react";
// import "./Map.scss";
import * as d3 from "d3";
import { Chart } from "react-google-charts";
import Navigation from "../Navigation";

function Data() {

  const data= [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7]
  ]

 const options = {
    title: "My Daily Activities",
    pieHole: 0.4,
    is3D: true
 }



  return (
    <div>
    <Navigation/>
<div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
<div style={{width:600}}>
<Chart
  chartType="ScatterChart"
  data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
  width={"100%"}
  height="400px"
  legendToggle
/>
    </div>
    <div style={{width:500}}>
      <Chart 
      chartType="PieChart"
      data={data}
      options={options}
      width="100%"
      height="400px"
      />
    </div>
    </div>
    </div>
  )

}
export default Data;