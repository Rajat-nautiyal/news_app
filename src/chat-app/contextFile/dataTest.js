import { useContext, useState, useEffect } from "react";
import {AllUserContext} from './authContext.js'

export const DataTest =()=>{
    // const {allUserData, messageData} = useContext(AllUserContext)
    const dbData = useContext(AllUserContext);
    const {allUserData, messageData} = dbData;

    return(<>
            {allUserData.map((doc) =>(
                             <div>   {doc.username}</div>
               
            ))}
             {messageData.map((doc) =>(
                             <div>   {doc.id}</div>
               
            ))}
    </>)


}