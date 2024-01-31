import { useEffect, useState, useContext } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import {auth , firestore, storage} from '../firebase.js';
import {AllUserContext} from '../contextFile/dataContext.js'
import { BiArrowBack } from "react-icons/bi";
import '../chat.css/navbar.css'
import '../chat.css/home.css'

export const Navbar =()=>{
    const {allUserData, state, dispatch} = useContext(AllUserContext);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [isBacked , setIsBacked] = useState(null) ;

    const [userName, setUserName]= useState('');
    const [userPic, setUserPic]= useState('');
    const [currentUserPic, setCurrentUserPic]= useState('');
    const [group, setGroup] = useState(false)

    const groupPic = `https://firebasestorage.googleapis.com/v0/b/fir-chatapp-82a43.appspot.com/o/chat_pics%2Fmessages%2FScreenshot%202024-01-29%20085754.png?alt=media&token=1f9c3b66-8390-421a-91d6-1d58927a60db`
    const usersData = allUserData;
    const nameNpic =()=>{
        if(usersData){  
            const friendDetails = usersData.find(user => user.user_id == state.userId);
            const currentUserDoc = usersData.find(user => user.user_id == auth.currentUser.uid);
            if(friendDetails && currentUserDoc){
                setUserName(friendDetails.originalUsername);
                setUserPic(friendDetails.photoUrl);
                setGroup(false)
            }
            if(state.groupId){
                setGroup(true)
            }
        } else return
        
    }

    const backTobar =()=>{
        setIsBacked(true)
        dispatch({type:'isBacked',payload:isBacked})

    }
    
    useEffect(()=>{
        nameNpic() 
    },[state.chatId, allUserData,state.groupId]) 

    useEffect(() => {
        const currentUserDoc = usersData.find(user => user.user_id === auth.currentUser.uid);
        if (currentUserDoc) {
          setCurrentUserPic(currentUserDoc.photoUrl);
        }
      }, [allUserData]);
    
    return(
        <>
            <div id= {state.mode?"togNavDark" : "togNavLight"} className='nav'>
                   {isMobile&& <div className='backToSidebar' onClick={backTobar}><BiArrowBack/></div>}
                    <div className='userNuser'>
                    <div className='picNname'>
                    {group?<img src={groupPic}  className="circular-image"/>:(userPic?<img src={userPic}  className="circular-image"/>:null)}
                        <div>{group?`Group-1`:userName}</div>
                    </div>
                    <div style={{display: 'flex'}}><img src={currentUserPic} className="circular-image"/></div>
                </div>
            </div>
        </>
    )
}