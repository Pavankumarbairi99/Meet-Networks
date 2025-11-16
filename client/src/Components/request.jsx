import axios from "axios"
import { Base_URl } from "../utils/Constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequestList } from "../utils/RequestSlice"
import ConnectionCard from "./ConnectionCard"
import RequestsCard from "./RequestCard"

const Requests = ()=>{
    const dispatch = useDispatch()
    const requestdata = useSelector((store)=>store.request)
    const handleRequestReview=async()=>{
        const res = await axios.get(Base_URl+"/user/request/received",{withCredentials:true})
        dispatch(addRequestList(res?.data?.data))
    }
    useEffect(()=>{

        handleRequestReview()
    },[])

    if(!requestdata) return;
    if(requestdata.length ==0) return <h1 className="text-center text-xl my-10">No Connection Requests</h1>
    return(
        <div>
            <h1 className="text-center font-bold text-xl my-5">Connection Requests</h1>
            {requestdata.map(data=>(
                <RequestsCard key={data?._id} requestdata={data} />
            ))}
        </div>
    )
}
export default Requests