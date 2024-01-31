import { arrayUnion, getDoc, updateDoc } from 'firebase/firestore';
import {useContext, useState, useEffect} from 'react'
import {setDoc, collection, doc , where, serverTimestamp} from 'firebase/firestore';
import {auth, firestore} from '../firebase'
import {AllUserContext} from '../contextFile/dataContext.js'
import '../chat.css/home.css'

export const SearchBar =()=> {
    const {allUserData, messageData, state, dispatch} = useContext(AllUserContext);

    const[searchName, setSearchName] = useState('');
    const[foundedName , setFoundedName] = useState('');
    const[userId , setUserId] = useState('');
    const[searchedName , setSearchedName] = useState('');
    const[userPic , setUserPic] = useState('');

    const allUsersRef = collection(firestore, 'allUsers')
    const messageRef = collection(firestore, 'messages')
    const usersData = allUserData
    const currentUser = usersData.find((d)=>d.id == auth.currentUser.uid)

    const searchUser = async () => {
        try {
          let usersArr
           if(usersData)
            {
                usersArr = usersData.filter((d)=>d.username == searchName.toLocaleLowerCase() )
                usersArr.forEach((doc) => {
                    console.log(doc.id)
                    setFoundedName(doc.originalUsername)
                    setUserId(doc.id)
                    setUserPic(doc.photoUrl)
                })
                if(foundedName.toLocaleLowerCase() == searchName.toLocaleLowerCase()){
                   setSearchedName(foundedName)
                }
                else setSearchedName('')
            }
        } catch (error) {
          console.error('Error searching for user:', error.message);
        }
      };

    useEffect(()=>{
        searchUser()
    },[searchName])

    const addDocToMessageCollec = async()=>{
        const currentUserId = auth.currentUser.uid;

        if(currentUserId == userId )
        return
        if(userId =='')
        return

        let currentUserName;
        if(auth.currentUser.displayName){
           currentUserName = auth.currentUser.displayName;
        }
        else 
          {
           currentUserName = currentUser.originalUsername
          }

        console.log(searchedName)
        console.log(currentUserName)
        const combineID = currentUserId >userId? currentUserId+userId : userId+currentUserId;
      
      try {
          await setDoc(doc(messageRef, combineID) ,{
              username1:currentUserId >userId? currentUserName:searchedName,
              username2:currentUserId >userId? searchedName:currentUserName,
              last_sentId:'',
              lastMessage: '',
              unread: false,
              createdAt: serverTimestamp(),

          })
           await updateDoc(doc(allUsersRef,currentUserId), {
              friends : arrayUnion(userId)
            })
            await updateDoc(doc(allUsersRef,userId), {
              friends : arrayUnion(currentUserId)
            })
            
            dispatch({type:'searchId',payload:userId})
            setSearchName('')
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        
    }

    return(
        <>
          <div className='searchNres' >
            <input type='text' value={searchName} 
              onKeyUp={searchUser}
              onChange={(e)=>setSearchName(e.target.value)}
              className='searchInput' placeholder='search user...'/>
            <div style={searchedName? {display:'flex'} : {display:'none'}} 
              className='foundedUser'>
                <div className='removeNname'>
                  <div onClick={addDocToMessageCollec}  id= {state.mode?"togSearchNimgDark" : "nothing"} className='searchNimg'><img src ={userPic} height= '30px' className="circular-image"/>{searchedName}</div>
                  <div onClick={()=>setSearchName('')}  id= {state.mode?"togRemImgDark" : "nothing"} style={{width:'4%'}}>x</div>
                </div>
            </div>
          </div>
        </>
    )
}