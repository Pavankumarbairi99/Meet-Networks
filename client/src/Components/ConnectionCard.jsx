import { Base_URl } from "../utils/Constants";

const ConnectionCard= ({user})=>{
    const {firstName,lastName,age,photoUrl,about,gender}= user;
    return(
        <div className="my-10 border bg-base-200 shadow-lg p-4 rounded-2xl w-1/2 mx-auto">
            <div className="flex">
            <img src={photoUrl} alt="img" className="w-22 rounded-2xl"></img>
           <div className="flex flex-col justify-center mx-5">
             <h1 className="font-bold py-2">Name: {firstName+" " + lastName}</h1>
            {age && gender && <div className="flex mb-1" style={{fontSize:"14px"}}> <p className="me-5">Age: {age}</p> <p>Gender: {gender}</p> </div>}
             <p style={{fontSize:"14px"}}>About: {about}</p>

            {/* <p>Skills: {skills.join(" ")} </p>*/}

           </div>
            </div>
        </div>
    )
}
export default ConnectionCard