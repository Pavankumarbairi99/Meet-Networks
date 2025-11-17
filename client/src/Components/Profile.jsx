import {  useState } from "react";
import { Base_URl } from "../utils/Constants";
import FeedsCard from "./feedsCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import EditProfilePic from "./editProfileCard";
import toast from "react-hot-toast";


const Profile = ()=>{
 
  const userData = useSelector((store)=>store.user);
  const [firstName,setFirstName]=useState(userData?.firstName)
  let [lastName,setLastName]=useState(userData?.lastName)
  let [about,setAbout]=useState(userData?.about)
  let [age,setAge]=useState(userData?.age)
  let [gender,setGender]=useState(userData?.gender)
  let [photoUrl,setPhotoUrl]=useState(userData?.photoUrl)
  let dispatch =useDispatch()
  let [showuploadimageStatus,setuploadimageStatus]=useState(false)
  
  const editeProfilePic=async()=>{
    setuploadimageStatus(true)
    const formData = new FormData();
    formData.append("image", photoUrl);
    const res = await axios.put(Base_URl + "/upload-image", formData, {
    withCredentials: true,
    });
    setPhotoUrl(res?.data?.data)

  }
  const updateProfileApi = async()=>{
   try{
      const res = await axios.patch(Base_URl+"/profile/edit",{firstName,lastName,age,about,gender,photoUrl},{withCredentials:true})
    dispatch(addUser(res?.data?.data))
    
    toast.success(res?.data?.message)
   }catch(err){
    toast.error(err?.message)
   }
   
  }

    return(
        <div>
            <div className="my-8 font-bold grid grid-cols-12 gap-8 px-5">
                <div className=" col-span-12 md:col-span-6 card bg-base-300 shadow-sm ">
                    <div className="card-body">
                        <h2 className="card-title">Edit Profile</h2>
                                <div className="my-1 p-2">
                                    <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm ">First Name</legend>
                                    <input type="text" value={firstName} className="input" placeholder="Type here"
                                    onChange={(e)=>setFirstName(e.target.value)} />
                                    </fieldset>
                                    <fieldset className="fieldset my-1">
                                    <legend className="fieldset-legend text-sm  ">Password</legend>
                                    <input type="text" className="input" placeholder="Type here" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                                    </fieldset>
                                       <fieldset className="fieldset">
                                        <legend className="fieldset-legend text-sm ">Profile Pic</legend>
                                       <div className="flex ">
                                         <input type="file" className="bg-gray-700 py-2 px-3 rounded-sm text-white w-2/3" 
                                         onChange={(e)=>setPhotoUrl(e.target.files[0])}  required />
                                        <button className=" mx-2 w-1/3 btn bg-gray-700 text-white hover:text-green-500" onClick={editeProfilePic}>{showuploadimageStatus?"✔️":"Submit"}  </button>
                                       </div>
                                    </fieldset>
                                    <fieldset className="fieldset my-1">
                                    <legend className="fieldset-legend text-sm  ">Age</legend>
                                    <input type="text" className="input" placeholder="Type here" value={age} onChange={(e)=>setAge(e.target.value)} />
                                    </fieldset>
                                    <fieldset className="fieldset my-1">
                                    <legend className="fieldset-legend text-sm  ">Gender</legend>
                                    <input type="text" className="input" placeholder="Type here" value={gender} onChange={(e)=>setGender(e.target.value)} />
                                    </fieldset>
                                    <fieldset className="fieldset my-1">
                                    <legend className="fieldset-legend text-sm ">About</legend>
                                    <input type="text" className="input" placeholder="Type here" value={about} onChange={(e)=>setAbout(e.target.value)} />
                                    </fieldset>
                                </div>
                                <p className="my-2 text-center text-red-600 ">{}</p>
                                    <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={updateProfileApi} >Save Profile</button>
                                    </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6 ">
                    
                <EditProfilePic  />
                
                </div>
            </div>

           
        </div>
    )
}
export default Profile
