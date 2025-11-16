import { useSelector } from "react-redux";



const EditProfilePic=()=>{
    const user = useSelector((store)=>store.user)
    return(
        <div>
            <div className="card bg-base-200 w-100 shadow-sm">
                <figure>
                    <img 
                    src={user?.photoUrl}
                    alt="Profile Picture" className="mt-3 w-70 bg-cover rounded-2xl"/>
                </figure>
                <div className="card-body">
                <h2 className="card-title justify-center text-lg font-bold">{user?.firstName +" " + user?.lastName}</h2>
                {user?.age && user?.gender &&( <div className="flex text-center">
                    <p className="font-semibold">Age: {user?.age +" "} <span className="ms-3"> Gender: {user?.gender}</span> </p>
                    </div>)}
                    <p className=" font-semibold mb-1 text-center">About: {user?.about}</p>
                </div>
            </div>
           
        </div>
    )
}
export default EditProfilePic;