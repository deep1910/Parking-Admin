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
  
     
  ];
