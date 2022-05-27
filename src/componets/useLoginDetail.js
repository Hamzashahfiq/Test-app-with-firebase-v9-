import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { doLogin } from '../store/action/AuthAction'

const loginDetail = {userName:"", password:""}

export default function useLoginDetail() {
    const [login, setLogin] = useState(loginDetail)
    const [loginLoading, setLoginLoading] = useState(false)
    const dispatch = useDispatch()


    const setValue = (e) => {
        setLogin ({...login,[e.target.name]:e.target.value}) 
    }

  const checkLogin = async() => {
      if (!login.userName || !login.password){
          alert("Please fill all the field correctly")
          return;
      }
       let loginUser ={
         userName : login.userName,
         password : login.password
       }
       dispatch(doLogin(loginUser, setLoginLoading))
      
    //  try{
    //    const res  = await signInWithEmailAndPassword(auth, login.userName,login.password)
    //    alert("Login successfully ")
    //    console.log(res)
    //    setIsLoginUser(true)
    //  }catch(error){
    //      alert(error.massage)
    //  }      
  }
     
  return (
      {
        login,
        setValue,
        checkLogin,
        loginLoading
       
      }
  )
}
