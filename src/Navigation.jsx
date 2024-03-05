import { Link } from 'react-router-dom';



const Navigation = () => {
    return (
      <div style={{backgroundColor:'#c0c0c0', height:'80px', width:'100%',  }}>


      <nav style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', alignContent:'center'}}>
      <ul style={{listStyleType:'none', display:'flex', textDecoration:'none',flexDirection:'row', gap:40,fontSize:26,paddingLeft:80, alignItems:'center', paddingTop:25}}>
        <li><Link style={{textDecoration:'none', color:'inherit'}} to="/">Home</Link></li>
        <li><Link style={{textDecoration:'none', color:'inherit'}} to="/register">Register</Link></li>
        <li><Link style={{textDecoration:'none',  color:'inherit'}} to="/data">Data</Link></li>
      </ul>
      <div style={{marginRight:100, paddingTop:25, marginLeft:40}}>
     <Link style={{textDecoration:'none', color:'inherit', fontSize:26}} to="/account">Account</Link>
     </div>
     </nav>
    
   
     </div>
    );
  };
  
  export default Navigation;