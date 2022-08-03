import * as React from "react"
import "./NavLinks.css"
import { NavLink } from "react-router-dom"



//import contexts
import { useAuthContext } from "../../contexts/auth"


export default function NavLinks() {


  const { user, handleOnLogout } = useAuthContext()


  return (
    <div className="nav-links">
      <ul>
        <li><NavLink to="/" label="Home" className="nav-link" activeClassName="active-link" >Home</NavLink></li>
        <li><NavLink to="/sports" label="sports" className="nav-link" activeClassName="active-link">Sports Home</NavLink></li>
        <li><NavLink to="/learning" label="learning" className="nav-link" activeClassName="active-link">Learning Center</NavLink></li>
        <li><NavLink to="/profile" label="profile" className="nav-link" activeClassName="active-link">Profile</NavLink></li>
        {/* Logout button moves slightly up when hovered.. need to make it stay in place like other li elements */}
        {user?.email ? <li className = "logout-li" onClick={handleOnLogout}><NavLink to="/login" className="nav-link" activeClassName="active-link">Logout</NavLink></li> 
        : <>
            <li><NavLink to="/login" label="Login" className="nav-link" activeClassName="active-link">Login</NavLink></li>
            <li><NavLink to="/register" label="Sign up" className="nav-link" activeClassName="active-link">Sign Up</NavLink></li>
          </>}

      </ul>
              
    </div>
  )
}