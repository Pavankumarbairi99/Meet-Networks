import axios from "axios";
import { Base_URl } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/RequestSlice";
import toast from "react-hot-toast";

const RequestsCard= ({requestdata})=>{

    const dispatch = useDispatch()
    const {firstName,lastName,photoUrl,about}= requestdata.fromUserId;
    
    const RequectUpdate = async(status)=>{
      try{
        await axios.post(Base_URl+"/request/review/"+status+"/"+requestdata?._id,{},{withCredentials:true})
        dispatch(removeRequest(requestdata?._id))
        toast.success(`Connection Request ${status}`)
        
      }catch(err){
        toast.error(err?.data?.message)
      }       
    }
   
    return(
        <div className="my-10  bg-base-200 shadow-lg p-4 rounded-2xl w-1/2 mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
                <img
                src={photoUrl}
                alt="img"
                className="w-40 h-40 rounded-2xl object-cover"
                />
            </div>

          <div className="flex flex-col items-center ">
            <h1 className="font-bold py-2 text-lg">
              {firstName + " " + lastName}
            </h1>
            <p className="text-sm">About: {about}</p>

            {/* <p>Skills: {skills.join(" ")} </p>*/}

            <div className="flex gap-3 mt-3">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
                onClick={() => RequectUpdate("accepted")}
              >
                Accept
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700"
                onClick={() => RequectUpdate("rejected")}
              >
                Reject
              </button>
            </div>
          </div>
            </div>
            
        </div>
    )
}
export default RequestsCard;