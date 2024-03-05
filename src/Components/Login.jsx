

// import React, { useState } from 'react';
// // import { signUp, signIn } from '../firebaseConfig';

// function Login() {
// //   const [email, setEmail] = useState('');

//   return (
//     <div style={{padding:50, borderWidth:2 , backgroundColor:'skyblue', display:'flex', flexDirection:'column'}}>
//       <input  style={{ width:150, padding:10, marginBottom:5}}type="email" placeholder='Email'/>
//       <input  type="password"  style={{ width:150, padding:10,marginBottom:5}} placeholder='Password'/>
//       <button style={{ width:150, padding:10,marginBottom:5}}>Sign Up</button>
//       <button   style={{ width:150, padding:10,marginBottom:5}}>Sign In</button>
//     </div>
//   );
// }

// export default Login;


import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { NavLink, useNavigate } from 'react-router-dom'
 
const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
          
            // console.log(user.displayName);
            console.log(user.email);
            navigate("/account", {state: {email:user.email}})
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
        <>
            <main >        
                <section>
                    <div>                                            
                                     
                                                       
                        <form>                                              
                            <div>
                                <label htmlFor="email-address">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                                                
                            <div>
                                <button                                    
                                    onClick={onLogin}                                        
                                >      
                                    Login                                                                  
                                </button>
                            </div>                               
                        </form>
                       
                        <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <NavLink to="/signup">
                                Sign up
                            </NavLink>
                        </p>
                                                   
                    </div>
                </section>
            </main>
        </>
    )
}
 
export default Login