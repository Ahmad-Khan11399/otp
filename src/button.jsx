import Otp from "./otp.jsx"
import {useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
function Button() {
  const [show, setShow]=useState(false)
  return(
   <div className="main">

   {show?<Otp/>:
     <button id="btn" className="btn btn-lg btn-primary custom-button" onClick={()=>{setShow(true);}}>
     Click here to generate OTP
     </button>}
   </div>
  )
}

export default Button;
