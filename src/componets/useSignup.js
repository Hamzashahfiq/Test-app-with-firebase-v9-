import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { DoSignup} from '../store/action/AuthAction'

const signupDetail = {userName:"", password:""}

export default function useSignup() {
    const [signup, setSignup] = useState(signupDetail)
    const [singupLoading, setSingupLoading] = useState(false)
    const dispatch = useDispatch()


    const setValue = (e) => {
        setSignup ({...signup,[e.target.name]:e.target.value}) 
    }

  const signupHandler = async() => {
      if (!signup.userName || !signup.password){
          alert("Please fill all the field correctlly")
          return;
      }
       let signupUser ={
         userName : signup.userName,
         password : signup.password
       }
       dispatch(DoSignup(signupUser, setSingupLoading))
          
  }
     
  return (
      {
        signup,
        setValue,
        signupHandler,
        singupLoading
       
      }
  )
}
