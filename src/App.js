import { useState, useEffect } from "react";
import Routing from "./routing/Routing";
import {CheckLoginUser} from './store/action/AuthAction'
import { useDispatch } from 'react-redux'



function App() {
 const [curentUser, setCurentUser] = useState(false)
 const dispatch = useDispatch()

useEffect(() =>{
  dispatch(CheckLoginUser(setCurentUser))
  
})

  return(
    <>
    {curentUser?
       <h5>Loading...</h5>:
      <Routing/>
      }
    </>
  )
 
}

export default App;
