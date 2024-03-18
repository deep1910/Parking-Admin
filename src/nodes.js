import { collection, addDoc, doc , onSnapshot ,getDocs} from "firebase/firestore";
import {db} from './firebaseConfig';

const citiesCollection = collection(db, "names");



async function fetchData(){
    const querySnapshot = await getDocs(citiesCollection);
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
     
     

}
 

export const nodes = [
    {
      id:1,
      username: 'user1',
      vehiclename: "Volkswagen Beetle",
      entrytime: "12:00",
      exittime: "14:00",
      duration: "2 hours",
      location: "P1",
      exitpermission: "Yes",

    },
    {
        id:2,
        username: 'user1',
        vehiclename: "Volkswagen Beetle",
        entrytime: "12:00",
        exittime: "14:00",
        duration: "2 hours",
        location: "P1",
        exitpermission: "Yes",
  
      },
      {
        id:3,
        username: 'user1',
        vehiclename: "Volkswagen Beetle",
        entrytime: "12:00",
        exittime: "14:00",
        duration: "2 hours",
        location: "P1",
        exitpermission: "Yes",
  
      },
      {
        id:3,
        username: 'user1',
        vehiclename: "Volkswagen Beetle",
        entrytime: "12:00",
        exittime: "14:00",
        duration: "2 hours",
        location: "P1",
        exitpermission: "Yes",
  
      },
      {
        id:4,
        username: 'user1',
        vehiclename: "Volkswagen Beetle",
        entrytime: "12:00",
        exittime: "1--00",
        duration: "2 hours",
        location: "P1",
        exitpermission: "Yes",
  
      },
     
      {
        id:6,
        username: 'user1',
        vehiclename: "eetle",
        entrytime: "12:00",
        exittime: "14:00",
        duration: "2 hours",
        location: "P1",
        exitpermission: "Yes",
  
      },
      {
        id:7,
        username: 'user1',
        vehiclename: "Volkswagen Beetle",
        entrytime: "12:00",
        exittime: "14:00",
        duration: "2 hours",
        location: "P1",
        exitpermission: "Yes",
  
      },
      {
        id:6,
        username: 'user1',
        vehiclename: "Volkswagen Beetle",
        entrytime: "12:00",
        exittime: "14:00",
        duration: "2 hours",
        location: "P1",
        exitpermission: "Yes",
  
      },
  ];
