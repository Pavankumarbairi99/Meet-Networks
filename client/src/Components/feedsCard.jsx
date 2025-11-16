import axios from "axios";
import { Base_URl } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { removeFeeds } from "../utils/feedSlice";
import toast from "react-hot-toast";

const FeedsCard=({user,hiddenbtn})=>{
  
    const dipatch = useDispatch()
    const fetchsendRequest = async(status,_id)=>{
        await axios.post(Base_URl+`/request/send/${status}/${_id}`,{},{withCredentials:true})
        toast.success(`Sent ${status} to ${user?.firstName}`)
        dipatch(removeFeeds(_id))
    }
   
    return(
        <div>
            <div className="card bg-base-200 w-100 shadow-sm">
                <figure>
                    <img 
                    src={user?.photoUrl }
                    alt="Profile Picture" className="mt-3 w-70 bg-cover rounded-2xl"/>
                </figure>
                <div className="card-body">
                <h2 className="card-title justify-center text-lg font-bold">{user?.firstName +" " + user?.lastName}</h2>
                {user?.age && user?.gender &&( <div className="flex text-center">
                    <p className="font-semibold">Age: {user?.age +" "} <span className="ms-3"> Gender: {user?.gender}</span> </p>
                    </div>)}
                    <p className=" font-semibold mb-1 text-center">About: {user?.about}</p>
                   {hiddenbtn &&( <div className="card-actions justify-evenly my-3">
                     <button className="btn  btn-secondary" onClick={()=>fetchsendRequest("ignore", user?._id)}>Ignore</button>
                    <button className="btn btn-primary" onClick={()=>fetchsendRequest("interested", user?._id)}>Interested</button>
                    </div>)}
                    
                </div>
            </div>
            
        </div>
    )
}
export default FeedsCard;