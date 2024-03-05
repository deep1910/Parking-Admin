import React, { useState } from 'react'
import Navigation from '../Navigation'
// import { Login } from '../Components/Login'
import Login from '../Components/Login'
import Signup from '../Components/Signup'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
// let location = useLocation();



function Account() {
 
  const [login, setLogin] = useState(false)  
  const navigate = useNavigate();
  const location = useLocation();


//   const  email = location.state.email;
const email = location.state ? location.state.email : null;
  console.log(email);
  return (
    <div>
        <Navigation/>
         {/* {login ? <Login/> : <Signup/>} */}
         {/* <Login/> */}
         {/* <Signup/> */}
         {email != null ? 
          <div>
             <h1>Hello , {email}</h1>
             <button>Logout</button>

          </div>
           :




  <div style={{padding:50,backgroundColor:'#FF5733',height:400, display:'flex', flexDirection:'column', gap:30}}>
    <button  style={{backgroundColor:"#c0c0c1", fontSize:30, borderRadius:20, width:240, padding:10}} onClick={()=> navigate("/signup")}>Create new user</button>
    <button  style={{backgroundColor:"#c0c0c1", fontSize:30, borderRadius:20, width:240, padding:10}} onClick={()=> navigate("/login")}>Login</button>
  </div>
}
        
        
        </div>
  )
}

export default Account