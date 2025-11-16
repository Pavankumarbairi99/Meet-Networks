import axios from "axios"
import { Base_URl } from "../utils/Constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../utils/connectionSlice"
import ConnectionCard from "./ConnectionCard"
import toast from "react-hot-toast"

const Connection=()=>{
    const dipatch = useDispatch()
    const ConnecitonList = useSelector((store)=>store.connection)
   const fetchConnectionApi=async()=>{
       try{
        let res = await axios.get(Base_URl+"/user/connections",{withCredentials:true})
        dipatch(addConnection( res?.data?.data))
       } catch(err){
        toast.error(err?.message)
       }
    }
    useEffect(()=>{
        fetchConnectionApi()
    },[])
    if(!ConnecitonList) return <div>"no Connection"</div> ;
     if(ConnecitonList.length ===0 | null) return (<div>
      <h1 className="text-center my-10 font-bold text-xl">  Conneciton not Found </h1>
    </div>)
    return(
        <div className="my-10">
            <h1 className="font-bold text-xl text-center">Connections</h1>
            {ConnecitonList.map(userList=>(
                <ConnectionCard key={userList?._id} user={userList} />
            ))}
        </div>
    )
}
export default Connection