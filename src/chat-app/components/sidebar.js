import { useContext, useState, useEffect } from "react";
import {auth , firestore, storage} from '../firebase.js';
import {collection, onSnapshot, doc, getDoc} from 'firebase/firestore'
import {AllUserContext} from '../contextFile/dataContext.js'
import '../chat.css/sidebar.css'
import { GoDotFill } from "react-icons/go";
import { SearchBar } from "./searchBar";
import '../chat.css/home.css'

export const Sidebar =()=>{
    const {allUserData, messageData, state, dispatch} = useContext(AllUserContext);;

    const [friendsData, setFriendsData] = useState([]);
    const [mesCollec, setMesCollec] = useState([]);
    const[group , setGroup]= useState([])

    const currentUserId = auth.currentUser.uid
    const currentUserData = allUserData.find(user => user.user_id == currentUserId)
    const messageCollecRef = collection(firestore, `messages`);
    const groupRef = collection(firestore, 'groups')

    const accessFriend =async()=>{
            if (currentUserData){
                const FriendsArray = currentUserData.friends || []
                const friends = allUserData.filter(doc => FriendsArray.includes(doc.user_id))
                setFriendsData(friends);
                onSnapshot(messageCollecRef, (querySnapshot) => { //unlike getDocs, onSnapshot updates real time data in UI on each change in db
                    const messageCollecArray = messageData.filter(u => u.username1 === currentUserData.username || u.username2 === currentUserData.username);
                    querySnapshot.forEach((doc) => {
                        messageCollecArray.push({...doc.data()});
                    })
                    setMesCollec(messageCollecArray)  
                })
                const groupDoc = doc(groupRef,'AenyHhj56yKLx6v2hMnt')
                const groupData = await getDoc(groupDoc)              
                // console.log(groupData.data())  
                setGroup(groupData.data())  
            }else return
        }
            
        const dischargeId =(id)=>{
            dispatch({type:'chatId',payload:id})
        }
        const dischargeGroupId =(id)=>{
            dispatch({type:'groupId',payload:id})
        }
        const goToChat =()=>{
            dispatch({type:'isBacked',payload:false})
        }
        
        useEffect(()=>{
             accessFriend() 
        },[state.chatId,messageData]) 

        
        return(
            <>
            <div id= {state.mode?"togSideDark" : "nothing"} className="sideUsername">
            <div className='searchBar'><SearchBar/></div>

            {friendsData && 
                friendsData.map((frnd) =>(
                    <>
                    <div id ='upperFriend' onClick={goToChat}>
                        <div key={frnd.id} onClick={() => dischargeId(frnd.user_id)} 
                            id= {state.mode?"togFrndDark" : "nothing"} className="friends">                    
                            <img src = {frnd.photoUrl} className="sidebar-image" />
                            <div style={{display: 'flex',alignItems: 'center'}}>{frnd.originalUsername}</div>
                            <div className="lastMessage">
                                {mesCollec.find((u) => (u.username1 === frnd.originalUsername || u.username2 === frnd.originalUsername) && (u.username1 === currentUserData.originalUsername || u.username2 === currentUserData.originalUsername))?.lastMessage}
                            </div>
                            <div className="greenDot">
                                {mesCollec.find((u) => (u.username1 === frnd.originalUsername || u.username2 === frnd.originalUsername) && (u.username1 === currentUserData.originalUsername || u.username2 === currentUserData.originalUsername))?.unread?
                                    (<GoDotFill style={mesCollec.find((u) => (u.username1 === frnd.originalUsername || u.username2 === frnd.originalUsername) && (u.username1 === currentUserData.originalUsername || u.username2 === currentUserData.originalUsername))?.last_sentId===currentUserId?{ display: 'none' }:{color:'green'}} /> ) : (<GoDotFill style={{ display: 'none' }} />)}
                            </div>

                        </div>
                    </div>
                    </>))
                    }
            <div id ='upperFriend' onClick={goToChat}>
                <div onClick={() => dischargeGroupId('AenyHhj56yKLx6v2hMnt')} 
                    id= {state.mode?"togFrndDark" : "nothing"} className="friends">                    
                    <img src = {group.groupPic} className="sidebar-image" />
                    <div style={{display: 'flex',alignItems: 'center'}}>{group.groupName}</div>
                    <div className="lastMessage">
                        {group.lastMessage}
                    </div>
                    <div className="greenDot">
                    {group.last_sentId?
                    (<GoDotFill style={group.last_sentId===currentUserId?{ display: 'none' }:{color:'green'}} /> ) : (<GoDotFill style={{ display: 'none' }} />)}
                    </div>

                </div>
                
                </div>
            </div>
                    
            </>
    )

}