import React from 'react'
import { Link } from 'react-router-dom'


export default function Header() {
    return (
        <div><ul>
           <Link to="/home"><li>Home page</li></Link> 
           <Link to="/login">  <li>login</li></Link>
           {/* <Link to="/mainpage"> <li>user page</li></Link> */}
           <Link to="logout"> <li>logout page</li></Link>
           <Link to="/personal"> <li>personal page</li></Link>
        </ul></div>
    )
}
