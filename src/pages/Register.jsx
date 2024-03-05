

import React, { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Navigation from "../Navigation";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import { collection, addDoc, doc , onSnapshot ,getDocs} from "firebase/firestore";
import {db} from '../firebaseConfig';


import TooltipControl from '@mapbox-controls/tooltip';
import '@mapbox-controls/tooltip/src/index.css';


// const AnyReactComponent = ({ text }) => <div>{text}</div>;



function Register() {

  const [lng, setLng] = useState(76.6781);
  const [lat, setLat] = useState(20.7892);
  const [zoom, setZoom] = useState(14);
  
  // const [markercoord, setMarkercoord] = useState([]);
  // const [coord, setCoord] = useState([]);


const mapContainerRef = useRef(null);
const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/streets-v12");

const [parkings, setParkings] = useState([[76.6771746,20.7872743],[76.6782850,20.7862800], [76.6793840, 20.7892750]]);
const [tools, setTools] = useState(false)



const [parkcoord, setParkcoord] = useState([]);
const [parkname, setParkname] = useState("");
const [pricing, setPricing] = useState("");
const [address, setAddress] = useState("");

mapboxgl.accessToken ="pk.eyJ1IjoiZGVlcDE5MTAiLCJhIjoiY2x0NXJtNGJ3MDN3ODJsdGd5M2NmdGdwbCJ9.0-tDsI1WSTyYZihiH-PA0Q";

useEffect(() => {
 
  const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: mapStyle,
    center: [76.67, 20.78], // longitude and latitude
    zoom: 12,
    attributionControl: false,
  });
  

  const nav = new mapboxgl.NavigationControl({
    visualizePitch: true
});
map.addControl(nav, 'bottom-right');










parkings.forEach(parking => {
  const marker = new mapboxgl.Marker()
    .setLngLat(parking)
    .addTo(map);

})



  // Initialize the geolocate control.
const geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
      enableHighAccuracy: true
  },
  trackUserLocation: true,
  showAccuracyCircle:true,
});
// Add the control to the map.
map.addControl(geolocate);
map.on('load', () => {
  geolocate.trigger();
});



const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true
  }
});
if(tools){
  map.addControl(draw);

}

// Store the coordinates of the drawn polygon
map.on('draw.create', updateArea);

function updateArea(e) {
  const data = draw.getAll();
  if (data.features.length > 0) {
    const coordinates = data.features[0].geometry.coordinates;
    console.log(coordinates);
    setParkcoord(coordinates);
  }
}




map.on('load', function() {
  map.addSource('single-point', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [] // Notice that initially there are no features
    }
  });
  // ALL YOUR APPLICATION CODE
});


const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl
});










const citiesCollectionRef = collection(db, "names");


  async function fetchData() {
    console.log("Data got ");
    
    const querySnapshot = await getDocs(citiesCollectionRef);
  
  const cities = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
  }));
  console.log(cities.length);

  const markercoord = [];
  const coord = [];




   cities.forEach((city)=> {
 
     const coordinates = Object.values(city.parkcoord)
     console.log(coordinates);

     markercoord.push(coordinates[0]);

     coord.push(coordinates);






})

console.log("Marker coord",markercoord);
console.log("Areacoord",coord);


// map.on('load', function () {
  markercoord.forEach(marker => {
    // if(markercoord.length == cities.length){
      new mapboxgl.Marker({color:'red',})
      .setLngLat(marker)
      .addTo(map);
    // }
  })

// })




map.on('load', async function () {
  const sources = coord.map((coordinates, index) => ({
    id: 'polygon' + index,
    data: {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'geometry': {
          'type': 'Polygon',
          'coordinates': [coordinates]
        }
      }
    }
  }));

  const layers = sources.map(source => ({
    'id': source.id + '-layer',
    'type': 'fill',
    'source': source.id,
    'layout': {},
    'paint': {
      'fill-color': '#088',
      'fill-opacity': 0.8
    }
  }));
  
  console.log("wait");
  await Promise.all(sources.map(source => new Promise(resolve => {
    map.addSource(source.id, source.data);
    resolve();
  })));

  console.log("1 loaded");

  await Promise.all(layers.map(layer => new Promise(resolve => {
    map.addLayer(layer);
    resolve();
  })));

  console.log("2 loaded");
});
        

    }
    console.log("All loaded");


    fetchData();

}, [tools]);



// useEffect(() => {

   
//   const map = new mapboxgl.Map({
//     container: mapContainerRef.current,
//     style: mapStyle,
//     center: [76.67, 20.78], // longitude and latitude
//     zoom: 12,
//     attributionControl: false,
//   });
  



// })

async function addParking()  {
  const citiesCollectionRef = collection(db, "names");


  const arrayToObject = (array) =>
  array.reduce((obj, item, index) => {
    obj[index] = item;
    return obj;
  }, {});
  console.log(parkcoord[0]);
  const objectParkcoord = arrayToObject(parkcoord[0]);
 
  console.log(objectParkcoord);
 



  // try {
  //     const docRef = await addDoc(collection(db, "parkings","Nagpur", parkname), {
  //       todo: objectParkcoord,    
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }

  
const cityData = {
  pricing: pricing,
  parkcoord:objectParkcoord,
  parkname:parkname,
  address:address,
  availability:34
};



addDoc(citiesCollectionRef, cityData)
    .then((docRef) => {
        console.log("Document written with ID:", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document:", error);
    });






///////////////////////////////////////////////////////////////////////////

}
 
// const todo = "aakf";

useEffect(() => {
  
  }, []);
  
  




  return (
    <div>
    <Navigation/>
    <div style={{display:'flex', flexDirection:'row'}}>
    <div style={{ height:'90vh', width:'30vw'}}>
       {/* <button style={{backgroundColor:'yellow',padding:10}}>View Parking Spaces</button> */}
       <div style={{display:'flex', flexDirection:'row',gap:5, alignItems:'center' }}>
       {/* <img src=" https://icons8.com/icon/7880/location" alt="location" style={{height:50, width:50}}></img> */}
       <img style={{marginLeft:20, marginTop:5}} width="30" height="30" src="https://img.icons8.com/ios-filled/50/ff0000/marker.png" alt="marker"/>
       <h3>Owner Parkings</h3>
       <img style={{marginLeft:20, marginTop:5}} width="30" height="30" src="https://img.icons8.com/ios-filled/50/00c0c0/marker.png" alt="marker"/>
       <h3>Other Parking Spaces</h3> 
 
        
       </div  >
       <div style={{margin:20}}>
       <button style={{backgroundColor:'yellow',padding:10, marginBottom:10}} onClick={()=> setTools(prev =>!prev)}>Register a Parking Space</button>
       {tools && 
       <div  >
       <input style={{marginRight:15, padding:8, width:175}} value={parkname} onChange={(e)=> setParkname(e.target.value) } placeholder="Parking Name" ></input> 
       <input style={{marginRight:15, padding:8, width:175}} value={address} onChange={(e)=> setAddress(e.target.value) } placeholder="Address" ></input> 
       <input style={{marginRight:15, padding:8, width:175}} value={pricing} onChange={(e)=> setPricing(e.target.value) } placeholder="Pricing in Rs" ></input> 

       <button style={{padding:8 ,borderRadius:30}} onClick={()=> addParking(parkcoord)}>Save Parking</button>
     
        </div>
        }
           </div>
       </div>
  
    <div className="sidebar">
         Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}       </div>
    <div ref={mapContainerRef} style={{height:'90vh', width:'70vw'}} ></div>
    </div>


    </div>

  )

}
export default Register;