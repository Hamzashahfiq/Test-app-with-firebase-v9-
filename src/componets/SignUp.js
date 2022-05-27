import React from 'react'
import useSignup from './useSignup'

export default function SignUp() {
  const {signup,setValue,signupHandler,singupLoading} = useSignup()
  return (
    <div>
      <label>Username</label> <input type="text" name='userName' value={signup.userName} onChange={(e) => setValue(e)} />
      <label>Password</label> <input type="password" name='password' value={signup.password} onChange={(e) => setValue(e)} />
      {singupLoading ? <button>Loading...</button> : <button type="submit" onClick={signupHandler} >Sign Up</button>}
    </div>
  )
}
