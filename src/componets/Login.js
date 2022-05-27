import React from 'react'
import useLoginDetail from './useLoginDetail'
import { Link } from 'react-router-dom'

export default function Login() {
  const {login,setValue,checkLogin,loginLoading} = useLoginDetail()
  return (
    <div>
      <label>Username</label> <input type="text" name='userName' value= {login.userName} onChange={(e) => setValue(e)}/>
      <label>Password</label> <input type="password" name='password' value = {login.password} onChange={(e) => setValue(e)}/>
       {loginLoading?<button>Logining...</button>: <button type="submit" onClick = {checkLogin } >Login</button>}
       <Link to='/signup'><button>Sign Up</button></Link>
    </div>
  )
}
