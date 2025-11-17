import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Base_URl } from "../utils/Constants"
import { Link, useNavigate } from "react-router-dom"
import { removeUser } from "../utils/userSlice"
import { clearFeeds } from "../utils/feedSlice"
import logo from "../assets/logo.png"

const NavBar=()=>{
    let user = useSelector((store)=>store.user)
    let dispatch = useDispatch()
    const navigate =useNavigate()
    const handleLogout =async()=>{
        
        await axios.post(Base_URl+"/logout",{} ,{
        withCredentials:true
      })
      dispatch(removeUser())
       dispatch(clearFeeds())
        navigate("/login")
    }
   
    return(
        <div className="navbar bg-blue-500 shadow-lg">
            <div className="flex-1">
               <div className="ml-2">
                <Link to="/" className="flex flex-row items-center "> 
               <p className="btn btn-ghost text-xl">
               <img src={logo} alt="logo" className="w-12 h-12" />
                 MeetNetwork</p>
               </Link>
               </div>
            </div>
            
           <div className="hidden lg:block"> <label className="flex cursor-pointer gap-2 ">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path
                d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>

            <input
                type="checkbox"
                value="dark"
                className="toggle theme-controller"
                defaultChecked
            />
            
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            </label> </div>
            {user&&( 
                 <div className="flex gap-2 mx-3">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto mx-10 hidden md:block" />
                <p className="mx-2 text-sm mt-3">{user?.firstName} </p>
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-14 rounded-full " >
                    <img 
                        src=  {user?.photoUrl   }  alt="img"  />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                    <Link to="/" className="justify-between">
                        Home
                        <span className="badge">New</span>
                    </Link>
                    </li>
                    <li>
                    <Link to="/profile" className="justify-between">
                        Profile
                        
                    </Link>
                    </li>
                     <li>
                    <Link to="/connection" >
                        Friends
                    </Link>
                    </li>
                     <li>
                    <Link to="/request" >
                        Requests
                    </Link>
                    </li>
                    <li onClick={handleLogout}><a>Logout</a></li>
                </ul>
                </div>
            </div>)}
        </div>
        )
}
export default NavBar
