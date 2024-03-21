import React, { useState, useEffect } from 'react';
// import  from 'react';

import { Link } from 'react-router-dom';
import Navigation from '../Navigation.jsx';

import { db } from '../firebaseConfig.js';
import { doc, onSnapshot, getDocs, collection } from 'firebase/firestore';

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
import axios from 'axios';
import { nodes } from '../nodes.js';
// export default {
// 	title: 'Theming/Custom ',
// 	component: Custom,
// };
const Home = () => {

  const [parkings, setParkings] = useState([]);

  const COLUMNS = [
    { label: 'username', renderCell: (item) => item.username },
    { label: 'vehicle-name', renderCell: (item) => item.vehiclename },
    { label: 'entry-time', renderCell: (item) => item.entrytime },
    { label: 'exit-time', renderCell: (item) => item.exittime },
    { label: 'duration', renderCell: (item) => item.duration },
    { label: 'location', renderCell: (item) => item.location },
    { label: 'exit-permission', renderCell: (item) => item.exitpermission },

  ];


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

  const theme = useTheme([colorTheme, stripedTheme, marginTheme]);
  const data = { nodes };


  const [realtime, setRealtime] = useState([])


  useEffect(() => {

    axios.get('http://localhost:3000/api/parkname')
      .then(response => {
        const dataArray = Object.values(response.data)
        setRealtime(dataArray);
        console.log("Realtime", realtime);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // console.log("Realtime", realtime);
    if (realtime.length != 0) {

      if (realtime[0].parkname.parkname != "") {
        console.log("Realtime Park", realtime[0].parkname.parkname);
     
        const vehiclename = realtime[0].vehiclename;
        const parkname = realtime[0].parkname.parkname;
        console.log(parkname);
        const node = {
          id: 8,
          username: 'user1',
          vehiclename: vehiclename,
          entrytime: "12:00",
          exittime: "14:00",
          duration: "2 hours",
          location: "P1",
          parkname: parkname,
          exitpermission: "Yes",
        }


        const nodeExists = nodes.some(existingNode => existingNode.id === node.id);

        if (!nodeExists) {
          nodes.push(node);
        }

      } else {
        console.log("Realtime not set");
        nodes.forEach((node)=>{
          if(node.parkname !== ""){
            nodes.pop(node);
          }
        })
      }
    }


  }, [realtime])


  return (


    <div >
      {/* <h2>Home</h2> */}
      <Navigation />
      <h1>Vehicles in Parking</h1>
      <div style={{ margin: 10 }} >


        <Table data={data} theme={theme}>

          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>UserName</HeaderCell>
                  <HeaderCell>Vehicle Name</HeaderCell>
                  <HeaderCell>Entry Time</HeaderCell>
                  <HeaderCell>Exit Time</HeaderCell>
                  <HeaderCell>Duration</HeaderCell>
                  <HeaderCell>Location</HeaderCell>
                  <HeaderCell>Parking</HeaderCell>
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
                    <Cell>{item.parkname}</Cell>
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


