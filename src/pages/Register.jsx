

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
// import { Database } from "firebase/database";
import { database } from "../firebaseConfig";
import {ref,onValue } from 'firebase/database'
import TooltipControl from '@mapbox-controls/tooltip';
import '@mapbox-controls/tooltip/src/index.css';




function Register() {

  const [lng, setLng] = useState(76.6781);
  const [lat, setLat] = useState(20.7892);
  const [zoom, setZoom] = useState(14);
  

const mapContainerRef = useRef(null);
const markerRef = useRef(null);
// `mapbox://styles/mapbox/satellite-v9`
// "mapbox://styles/mapbox/streets-v12"
const [mapStyle, setMapStyle] = useState(`mapbox://styles/mapbox/satellite-streets-v12`);

const [parkings, setParkings] = useState([[76.6771746,20.7872743],[76.6782850,20.7862800], [76.6793840, 20.7892750]]);
const [tools, setTools] = useState(false)

const citiesCollectionRef = collection(db, "names");



const [parkcoord, setParkcoord] = useState([]);
const [parkname, setParkname] = useState("");
const [pricing, setPricing] = useState("");
const [address, setAddress] = useState("");

const [realtime, setRealtime] = useState([]);

const[ tempareacoord, setTempareacoord] = useState([])
mapboxgl.accessToken ="pk.eyJ1IjoiZGVlcDE5MTAiLCJhIjoiY2x0NXJtNGJ3MDN3ODJsdGd5M2NmdGdwbCJ9.0-tDsI1WSTyYZihiH-PA0Q";


useEffect(()=>{
  // const id = userdetail.id;
  // console.log(id);
 // checkauthenticated()
  //console.log(userdetail?.id);
  const dbstarRef = ref (database, 'users/user/' );
         
  const unsubscribe =  onValue(dbstarRef, (snapshot) => {
      const data = snapshot.val();
   
      const dataArray = Object.values(data);
      // console.log("Dataarray",dataArray);
      setTimeout(()=>{
        setRealtime(dataArray)
      },5000)

  })

  
  return (()=> unsubscribe())
}, [realtime])



useEffect(() => {
 
  const map1 = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: mapStyle,
    center: [76.67, 20.78], // longitude and latitude
    zoom: 12,
    attributionControl: false,
  });
  

  const nav = new mapboxgl.NavigationControl({
    visualizePitch: true
});
map1.addControl(nav, 'bottom-right');







// parkings.forEach(parking => {
//   const marker = new mapboxgl.Marker()
//     .setLngLat(parking)
//     .addTo(map1);

// })

realtime.forEach((real, index) => {
  // Create a new div element for the marker
  if(real.location && real.location.coords){
  const el = document.createElement('div');
  el.style.width = '20px';
  el.style.height = '20px';
  el.style.backgroundColor =  'blue'; // alternate colors for each marker

  const number = "<h1>" + real.license+ "</h1>";
  // Create a new marker with the div as its element
   markerRef.current = new mapboxgl.Marker(el)
    // Set the marker's coordinates
    .setLngLat([real.location.coords.longitude, real.location.coords.latitude])
    // Add the marker to the map
    .setPopup(new mapboxgl.Popup().setHTML(number))
    // .setPopup(new mapboxgl.Popup().setHTML(number ? number : "No License")) 
    .addTo(map1);

 
  }
});

// markerRef.current.togglePopup();

  // Initialize the geolocate control.
const geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
      enableHighAccuracy: true
  },
  trackUserLocation: true,
  showAccuracyCircle:true,
});
// Add the control to the map.
map1.addControl(geolocate);
map1.on('load', () => {
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
  map1.addControl(draw);

}

// Store the coordinates of the drawn polygon
map1.on('draw.create', updateArea);

function updateArea(e) {
  const data = draw.getAll();
  if (data.features.length > 0) {
    const coordinates = data.features[0].geometry.coordinates;
    // console.log(coordinates);
    setParkcoord(coordinates);
  }
}




map1.on('load', function() {
  map1.addSource('single-point', {
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







  async function fetchData() {
    // console.log("Data got ");
    
    const querySnapshot = await getDocs(citiesCollectionRef);
  
  const cities = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
  }));
  // console.log(cities.length);

  const markercoord = [];
  const coord = [];




   cities.forEach((city)=> {
    //  console.log(city);
     const coordinates = Object.values(city.parkcoord)
    //  console.log(coordinates);

     markercoord.push(coordinates[0]);

     coord.push(coordinates);
     setTempareacoord(coord);
      // console.log("Tempareacoord",tempareacoord);


})

// console.log("Marker coord",markercoord);
// console.log("Areacoord",coord);





// map.on('load', function () {
  markercoord.forEach(marker => {
    // if(markercoord.length == cities.length){
      new mapboxgl.Marker({color:'red',})
      .setLngLat(marker)
      .addTo(map1);
    // }
  })

/



map1.on('load', async function () {
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
  
  // console.log("wait");
  await Promise.all(sources.map(source => new Promise(resolve => {
    map1.addSource(source.id, source.data);
    resolve();
  })));

  // console.log("1 loaded");

  await Promise.all(layers.map(layer => new Promise(resolve => {
    map1.addLayer(layer);
    resolve();
  })));

  // console.log("2 loaded");
});
        

    }
    // console.log("All loaded");


    fetchData();


  


}, [tools]);




useEffect(()=>{
  if (markerRef.current){
    markerRef.current.setLngLat([realtime[1].location.coords.longitude, realtime[1].location.coords.latitude])
    // console.log("Marker ref", realtime[1].location.coords.longitude, realtime[1].location.coords.latitude)
  }

  let cities;
  async function fetchData() {
    // console.log("Data got ");
    
    const querySnapshot = await getDocs(citiesCollectionRef);
  
   cities = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
  }));
 
   }
   fetchData()


  
  for (let i = 0; i < tempareacoord.length; i++) {
    let isInAnyPolygon = false;
    // const element = array[tempareacoord]
    console.log(tempareacoord.length, "Length");
    const point = {
      latitude: realtime[1].location.coords.latitude,
      longitude: realtime[1].location.coords.longitude
    }
    const subarrays = tempareacoord[i];

    const objects = subarrays.map(subarray => ({
      longitude: subarray[0],
      latitude: subarray[1],
      // age: subarray[2]
    }));
   
    if( point_in_polygon(point, objects)){
      // console.log("Point in polygon", point, objects);
      isInAnyPolygon = true;
      // break;
  }

   setTimeout(()=>{
    if(isInAnyPolygon){
      // cities.map((city, index)=>{
        // const coordinates = Object.values(city.parkcoord)
           
        // if (coordinates.length === tempareacoord[i].length && coordinates.every((value, index) => value === tempareacoord[i][index])) {
        //   console.log("Vehicle in this parking area", city.parkname);
        // }})
        // console.log("Coordinates", coordinates);
        // console.log("Tempareacoord", tempareacoord[i]);
        // if(coordinates === tempareacoord[i]){
          console.log("Vehicle in this parking area", i );
        }else{
          console.log("Vehicle not in this parking area" ,i);
        }
      // })
      // console.log("Point in polygon", point, objects, "Vehicle in parking area" ,i);

    // }
    // else{
    // console.log("Point not in polygon", point, objects);
  }, 3000)
  // isInAnyPolygon = false
  
  }

  

},[realtime])






function point_in_polygon(point, polygon) {
  const num_vertices = polygon.length;
  const x = point.latitude;
  const y = point.longitude;
  let inside = false;

  let p1 = polygon[0];
  let p2;
for (let i = 1; i <= num_vertices; i++) {
  p2 = polygon[i % num_vertices];

  if (y > Math.min(p1.longitude, p2.longitude)) {
      if (y <= Math.max(p1.longitude, p2.longitude)) {
          if (x <= Math.max(p1.latitude, p2.latitude)) {
              const x_intersection = ((y - p1.longitude) * (p2.latitude - p1.latitude)) / (p2.longitude - p1.longitude) + p1.latitude;

              if (p1.latitude === p2.latitude || x <= x_intersection) {
                  inside = !inside;
              }
          }
      }
  }

  p1 = p2;
}

return inside;
}



// useEffect(()=>{
//   vehiclemarker.setLngLat([realtime[0].location.coords.longitude, realtime[0].location.coords.latitude])

// }, [realtime] )

async function addParking()  {
  const citiesCollectionRef = collection(db, "names");


  const arrayToObject = (array) =>
  array.reduce((obj, item, index) => {
    obj[index] = item;
    return obj;
  }, {});
  // console.log(parkcoord[0]);
  const objectParkcoord = arrayToObject(parkcoord[0]);
 
  // console.log(objectParkcoord);
 



  
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



}




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
        {/* <div>
        {realtime.map((real, index) => (
      <p key={index}>{real.vehiclename}</p>
    ))}
        </div> */}
         
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