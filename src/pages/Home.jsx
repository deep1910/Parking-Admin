import React, {useState, useEffect} from 'react';
// import  from 'react';

import { Link } from 'react-router-dom';
import Navigation from '../Navigation.jsx';

import { db } from '../firebaseConfig.js';
import {doc, onSnapshot, getDocs, collection} from 'firebase/firestore';
// import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

// import DataTable, {createTheme} from 'react-data-table-component';
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import { nodes } from '../nodes.js';
// export default {
// 	title: 'Theming/Custom ',
// 	component: Custom,
// };
const Home = () =>{
 
   const [parkings, setParkings] = useState([]);




  // UserName</HeaderCell>
              // <HeaderCell>Vehicle Name</HeaderCell>
              // <HeaderCell>Enty Time</HeaderCell>
              // <HeaderCell>Exit Time</HeaderCell>
              // <HeaderCell>Duration</HeaderCell>
              // <HeaderCell>Location</HeaderCell>
              // <HeaderCell>Exit Permission
  
  const COLUMNS = [
    { label: 'username', renderCell: (item) => item.username },
    { label: 'vehicle-name', renderCell: (item) => item.vehiclename},
    { label: 'entry-time', renderCell: (item) => item.entrytime },
    { label: 'exit-time', renderCell: (item) => item.exittime },
    { label: 'duration', renderCell: (item) => item.duration},
    { label: 'location', renderCell: (item) => item.location },
    { label: 'exit-permission', renderCell: (item) => item.exitpermission },
    
  ];
  

  //  const columns = [
  //    {
  //      name: 'username',
  //      selector: row => row.username,
  //    },
  //    {
  //      name: 'vehicle name',
  //      selector: row => row.vehiclename,
  //    },
  //    {
  //     name: 'Exit Time',
  //     selector: row => row.exitTime,
  //   },
  //   {
  //     name: 'Duration',
  //     selector: row => row.duration,
  //   },
  //   {
  //     name: 'Location',
  //     selector: row => row.location,
  //   },
  //   {
  //     name: 'Exit Permission',
  //     selector: row => row.exitPermission,
  //   },

  //  ];
   
  //  const nodes = [
  //      {
  //      id: 1,
  //      username: 'Beetlejuice',
  //      vehiclename: "Volkswagen Beetle",
  //       exitTime: "12:00",
  //       duration: "2 hours",
  //       location: "P1",
  //       exitPermission: "Yes"
      
  //    },
  //    {
  //      id: 2,
  //      username: 'Beetlejuice',
  //      vehiclename: "Volkswagen Beetle",
  //       exitTime: "12:00",
  //       duration: "2 hours",
  //       location: "P1",
  //       exitPermission: "Yes"
      
  //    },
  //    {
  //      id: 3,
  //      username: 'Beetlejuice',
  //      vehiclename: "Volkswagen Beetle",
  //       exitTime: "12:00",
  //       duration: "2 hours",
  //       location: "P1",
  //       exitPermission: "Yes"
  //    }
    
  //  ]
   

 
   const colorTheme = {
    BaseRow: `
        color: #141414;
      `,
    Row: `
        &:hover {
          color: orange;
        }

        cursor: pointer;
      `,
  };

  const stripedTheme = {
    BaseRow: `
        font-size: 20px;
      `,
    HeaderRow: `
        background-color: #eaf5fd;
      `,
    Row: `
        &:nth-of-type(odd) {
          background-color: #d2e9fb;n
        }

        &:nth-of-type(even) {
          background-color: #eaf5fd;
        }
      `,
  };

  const marginTheme = {
    BaseCell: `
      
        padding: 11px;
      `,
  };

    // margin: 9px;
  const theme = useTheme([colorTheme, stripedTheme, marginTheme]);

  
  const data = { nodes };
  

  return(


    <div >
      {/* <h2>Home</h2> */}
      <Navigation/>
      <h1>Vehicles in Parking</h1>
      <div style={{margin:10}} >
      
     
       <Table data={data} theme={theme}>
       
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>UserName</HeaderCell>
              <HeaderCell>Vehicle Name</HeaderCell>
              <HeaderCell>Enty Time</HeaderCell>
              <HeaderCell>Exit Time</HeaderCell>
              <HeaderCell>Duration</HeaderCell>
              <HeaderCell>Location</HeaderCell>
              <HeaderCell>Exit Permission</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <Cell>{item.username}</Cell>
                <Cell>{item.vehiclename}</Cell>
                <Cell>{item.entrytime}</Cell>
                <Cell>{item.exittime}</Cell>
                <Cell>{item.duration}</Cell>
                <Cell>{item.location}</Cell>
                <Cell>{item.exitpermission}</Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
   
      </div>
      </div>
 
  );
} 


export default Home;



// const customStyles = {
// 	rows: {
// 		style: {
// 			minHeight: '72px', // override the row height
// 		},
// 	},
// 	headCells: {
// 		style: {
// 			paddingLeft: '8px', // override the cell padding for head cells
// 			paddingRight: '8px',
// 		},
// 	},
// 	cells: {
// 		style: {
// 			paddingLeft: '8px', // override the cell padding for data cells
// 			paddingRight: '8px',
// 		},
// 	},
// };


