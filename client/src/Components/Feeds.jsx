import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Base_URl } from "../utils/Constants"
import { useEffect } from "react"
import { addFeeds } from "../utils/feedSlice"
import FeedsCard from "./feedsCard"
import onlineStatus from "../utils/onlineStatus"
import internetImg from "../assets/internet.png"
import { useNavigate } from "react-router-dom"

const Feeds = ()=>{
    const hiddenbtn = true;
     let dispatch = useDispatch()
    let isOnline = onlineStatus();
    let navigate = useNavigate()
    let feeds = useSelector((store)=>store.feeds)
    const fetchFeedsApi = async()=>{
        if(feeds) return;
        try{
            let res= await axios.get(Base_URl+"/feeds",{withCredentials:true})
            dispatch(addFeeds(res?.data))
        }catch(err){
            if(err?.status === 400){
                navigate("/login")
            }
        }
    }
    useEffect(()=>{
        fetchFeedsApi()
    },[])
    if(isOnline===false){
        return <div className="my-10 flex justify-center">
            <h1>offline </h1>
           <img src={internetImg} className="w-11" alt="" />
        </div>
    }
    if(!feeds) return;
    if(feeds.length===0 ) return <h1 className="text-center text-xl my-10"> No More Feeds</h1>
    return feeds &&(
        <div className="my-10 text-center text-lg font-bold flex justify-center p-2 px-3">

<FeedsCard key={feeds[0]._id} user={feeds[0]} hiddenbtn={hiddenbtn} />
        </div>
    )
}
export default Feeds;