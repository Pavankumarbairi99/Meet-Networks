import { useState } from "react";
import axios from "axios";
 import { useDispatch } from "react-redux";
 import { addUser } from "../utils/userSlice";
import { Base_URl } from "../utils/Constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const Login = ()=>{
  let [firstName,setFirstName]=useState("")
  let [lastName,setLastName]=useState("")
  let [emailId,setEmailid]=useState("")
  let [password,setPassword]=useState("")
  let [errorMessage,setErrorMessage]= useState("")
  const [photoUrl,setPhotoUrl]=useState()
  const [isphotoSubmit,setIsphotoSubmit]=useState(false)
  const [toggle,setToggle]=useState(true)
  let [showuploadimageStatus,setuploadimageStatus]=useState(false)

  let dispatch = useDispatch()
  const navigate = useNavigate()
  const handlingApiCall= async(e)=>{
     e.preventDefault()
    try{
      if(!emailId || !password){
        return toast.error("Provide Required Fields")
      }
      let res = await axios.post( Base_URl + "/login",{
        emailId,password
      },{
        withCredentials:true
      })
      toast.success(res?.data?.message)
     dispatch(addUser(res?.data.data))
     navigate("/")
    }catch(err){
      setErrorMessage(err?.response?.data)
      console.log(err)
    }
  }

  const editeProfilePic=async()=>{
    
    const formData = new FormData();
    formData.append("image", photoUrl);
    const res = await axios.put(Base_URl + "/upload-image", formData, {
    withCredentials: true,
    });
    setuploadimageStatus(true)
    setIsphotoSubmit(true)
    setPhotoUrl(res?.data?.data)

  }
  const handleSingupApi = async (e) => {
     e.preventDefault()
  try {
    if(!photoUrl || !isphotoSubmit ){
      toast.error("Submit your Photo")
    return  
    }else if(firstName?.length < 3 && firstName?.length>20){
      return toast.error("User Name Must in 3 to 20 Characters")
    }
    else if(!emailId){
      return toast.error("Provide Email ID")
    }
    else if(!password){
      return toast.error("Provide Password")
    }
    const  res =await axios.post(Base_URl + "/signup", {firstName,lastName, emailId,password,photoUrl}, {
      withCredentials: true,
    });
   
    toast.success(res?.data?.message)
    setToggle(true);
  } catch (err) {

    toast.error(err?.response?.data)
  }
};

    return(
        <div className="flex justify-center my-10 px-3">
        <div className="card bg-base-200 w-96 shadow-lg ">
          <div className="card-body ">
            <h2 className="card-title justify-center text-xl">{toggle?"Login":"SingUp"}</h2>
            <div className="my-1 p-2">
             {!toggle&&( <div> <fieldset className="fieldset">
                  <legend className="fieldset-legend text-sm ">First Name</legend>
                  <input type="text" value={firstName} className="input" placeholder="firstName"
                  onChange={(e)=>setFirstName(e.target.value)}  required/>
              </fieldset>
              <fieldset className="fieldset">
                  <legend className="fieldset-legend text-sm ">Last Name</legend>
                  <input type="text" value={lastName} className="input" placeholder="lastName"
                  onChange={(e)=>setLastName(e.target.value)}  required />
              </fieldset>
              <fieldset className="fieldset">
                  <legend className="fieldset-legend text-sm ">Profile Pic</legend>
                  <div className="flex ">
                  <input type="file" className="bg-gray-700 py-2 px-3 rounded-sm text-white w-2/3" 
                  onChange={(e)=>setPhotoUrl(e.target.files[0])}  required />
                  <button className=" mx-2 w-1/3 btn bg-gray-700 text-white hover:text-green-500" onClick={editeProfilePic}>{showuploadimageStatus?"✔️":"Submit"}  </button>
                  </div>
               </fieldset>
              
               </div>)}
              <fieldset className="fieldset">
                  <legend className="fieldset-legend text-sm ">Email Id</legend>
                  <input type="text" value={emailId} className="input" placeholder="example@gmail.com"
                  onChange={(e)=>setEmailid(e.target.value)} required />
              </fieldset>
              <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend text-sm">Password</legend>
                  <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
               </fieldset>
          </div>
          <p className="my-2 text-center text-red-600 ">{errorMessage}</p>
            <div className="card-actions justify-end">
              <p className="my-3 cursor-pointer" onClick={()=>setToggle(!toggle)}>{toggle?"New User to SignUp ":"I already Have a Account"}</p>
              <button className=" btn border border-green-500 hover:bg-green-500 hover:text-white" onClick={toggle?handlingApiCall:handleSingupApi}>{toggle?"Login": "SignUp"}</button>
            </div>
          </div>
        </div>

</div>
    )
}
export default Login
