import { useContext, useEffect, useState, useRef } from 'react';
import {auth , firestore, database , storage} from '../firebase.js';
import {collection, onSnapshot, doc, updateDoc, addDoc, deleteDoc, query, orderBy, serverTimestamp} from 'firebase/firestore'
import {AllUserContext} from '../contextFile/dataContext.js';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { IoIosSend } from "react-icons/io";
import '../chat.css/home.css'
import { MdDelete } from "react-icons/md";
import { BiSolidImageAdd } from "react-icons/bi";

export const Chatroom = () => {
    const {allUserData, state, dispatch} = useContext(AllUserContext);

    const [formValue, setFormValue] = useState('');
    const [messages , setMessages] = useState([]) ;
    const [groupMes , setGroupMes] = useState([]) ;
    const[optionValue , setOptionValue]= useState('');
    const[imageUpload , setImageUpload]= useState(null);
    const[image , setImage]= useState(null);
    const[bool , setBool]= useState(false);
    
    const combineId = state.chatId? state.chatId : state.searchId;
    const groupId = state.groupId? state.groupId:null;
    const currentUserId = auth.currentUser.uid;

    const messagesContainerRef = useRef(null)
    const groupRef = collection(firestore, 'groups')

    const currentUser = allUserData.find(u=>u.user_id === auth.currentUser.uid)

    const scrollToBottom = () => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    };
    const A = new Date();
    const D = A.getDate();
    let months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    let M = months[A.getMonth()];
    const date = `${D} ${M}`;
    let options = { hour: '2-digit', minute: '2-digit' };
    let H = A.toLocaleTimeString(undefined, options);
    let time = `${date} ${H}`;

    const getMessages = async () =>{
      if (groupId) {
        setMessages('')
        const groupChatRef = collection(firestore, `groups/${groupId}/group_chats`)
        const q = query(groupChatRef, orderBy('messageAt'));
        onSnapshot(q, (querySnapshot) => { //unlike getDocs, onSnapshot updates real time data in UI on each change in db
            const cities = [];
            querySnapshot.forEach((doc) => {
                cities.push({...doc.data(), id: doc.id});
            })
            setGroupMes(cities)    
        });
        if(formValue==''&& groupId){
          await updateDoc(doc(groupRef,groupId),{
            last_sentId: currentUserId,
          })
      };
      scrollToBottom()
    }   
        if (!combineId) {
            console.error('combineId is empty or null');
            return;
          } 
        try {  
            
            const messageCollecRef = collection(firestore, `messages`);
            const messageRef = collection(firestore, `messages/${combineId}/chats`)
            const q = query(messageRef, orderBy('messageAt'));
            onSnapshot(q, (querySnapshot) => { //unlike getDocs, onSnapshot updates real time data in UI on each change in db
                const cities = [];
                querySnapshot.forEach((doc) => {
                    cities.push({...doc.data(), id: doc.id});
                })
                setMessages(cities) 
            });
            if(formValue==''&& combineId){
                await updateDoc(doc(messageCollecRef,combineId),{
                  unread: false,
                })
            };
            scrollToBottom();
            // const docData = await getDocs(q)
            // const filteredData = docData.docs.map((doc) => ({
            //   ...doc.data(),
            //   id:doc.id
            // }));
            // setMessages(filteredData)
          } catch (err) {
            console.error(err);
          }  
    }

    const sendMessage = async () => {

      if(groupId){
        //group collection
        const groupChatRef = collection(firestore, `groups/${groupId}/group_chats`)
        if(image){
          setMessages('')
          setImageUpload(true);
          scrollToBottom();
          const storageRef = ref(storage, `/chat_pics/messages/${image.name}`)
          await uploadBytes(storageRef, image).then(async(snapshot)=>{
            await getDownloadURL(snapshot.ref).then(async(url)=>{
                setImageUpload(false)
                await addDoc(groupChatRef, {
                  username:currentUser.originalUsername,
                  profilePic: currentUser.photoUrl,
                  user_message: formValue,
                  pic:url,
                  createdAt: time,
                  senderID: currentUserId,
                  messageAt:serverTimestamp(),
              });
                });
            });
            await updateDoc(doc(groupRef,groupId),{
              lastMessage:formValue,
              last_sentId:currentUserId,
            })
            
            setBool(!bool)
            dispatch({type:'bool',payload:bool})
            setImage(null)
            getMessages()
            setFormValue(''); // Clear input after sending message
        };
        if(formValue=='')
          return
        if(formValue&&!image){
              await addDoc(groupChatRef, {
                username:currentUser.originalUsername,
                profilePic: currentUser.photoUrl,
                user_message: formValue,
                pic:null,
                createdAt: time,
                senderID: currentUserId,
                messageAt:serverTimestamp(),
              });
              await updateDoc(doc(groupRef,groupId),{
                lastMessage:formValue,
                last_sentId:currentUserId,
                })
              setBool(!bool)
              dispatch({type:'bool',payload:bool})
              getMessages()
              setFormValue('');
          };
      }

//message collection
        if(combineId){
        const messageRef = collection(firestore, `messages/${combineId}/chats`);
        const messageCollecRef = collection(firestore, `messages`);
        if(image){
          setImageUpload(true);
          scrollToBottom();
          const storageRef = ref(storage, `/chat_pics/messages/${image.name}`)
          await uploadBytes(storageRef, image).then(async(snapshot)=>{
            await getDownloadURL(snapshot.ref).then(async(url)=>{
                setImageUpload(false)
                await addDoc(messageRef, {
                  user_message: formValue,
                  pic:url,
                  createdAt: time,
                  senderID: auth.currentUser.uid,
                  messageAt:serverTimestamp(),
              });
                });
            });
            await updateDoc(doc(messageCollecRef,combineId),{
              unread: true,
              lastMessage:formValue,
              last_sentId:currentUserId,
            })
            // scrollToBottom();
            setBool(!bool)
            dispatch({type:'bool',payload:bool})
            setImage(null)
            getMessages()
            setFormValue(''); // Clear input after sending message
        };
        if(formValue=='')
          return
        if(formValue&&!image){
              await addDoc(messageRef, {
                  user_message: formValue,
                  pic:null,
                  createdAt: time,
                  senderID: auth.currentUser.uid,
                  messageAt:serverTimestamp(),
              });
              await updateDoc(doc(messageCollecRef,combineId),{
                unread: true,
                lastMessage:formValue,
                last_sentId:currentUserId,
              })
              setBool(!bool)
              dispatch({type:'bool',payload:bool})
              getMessages()
              setFormValue(''); // Clear input after sending message
              // scrollToBottom();
          };
        }
    };
    useEffect(()=>{
        getMessages();
    },[state.chatId,state.groupId])
    

    const deleteMessage = async (id) => {
      if(groupId){
        const groupChatRef = collection(firestore, `groups/${groupId}/group_chats`)
        const document =  doc(groupChatRef, id);  // same as doc(firestore,"messages", id)
        await deleteDoc(document)   
        getMessages()
        setOptionValue(null)
      }
      if(combineId){
          const messageRef = collection(firestore, `messages/${combineId}/chats`)
          const document =  doc(messageRef, id);
          await deleteDoc(document)   
          getMessages()
          setOptionValue(null)
      }
    }

    return (
        <>
            <div id= {state.mode?"togChatRoomDark" : "togChatRoomLight"} className='chatroom'>
               {messages? (<div ref={messagesContainerRef} id= {state.mode?"togMesDark" : "togMesLight"}  className='messages'>
                    {messages.map((msg) => (
                      <div className= {msg.senderID==currentUserId?'upperSent':'upperReceive'}>
                          <div key={msg.id} onClick={()=>setOptionValue(msg.messageAt)} id= {state.mode?"togSentDark" : "togSentLight"} className= {msg.senderID==currentUserId?'sent':'receive'}>
                              <div style={optionValue === msg.messageAt && msg.senderID == currentUserId?{display:'flex'} : {display:'none'}} className={msg.senderID==currentUserId?'sentDelete':'receiveDelete'}><MdDelete onClick={()=>deleteMessage(msg.id)}/></div> 
                              {msg.pic? (<><img src ={msg.pic} style={{borderRadius:'10px', border:'1px solid black'}}  height ='100%' width='100%'/> {msg.user_message}</>) : (msg.user_message)}
                              <div className='sub'> {msg.createdAt}</div>
                        </div>                        
                    </div>
                    ))}
                {imageUpload?(<div className='sent' style = {{width:'50%', left:'50%'}}>uploading... </div>): (null)}
                </div>):
                (groupMes?(
                  <div ref={messagesContainerRef} id= {state.mode?"togMesDark" : "togMesLight"}  className='messages'>
                    {groupMes.map((msg) => (
                      <div className= {msg.senderID==currentUserId?'upperSent':'upperReceive'}>
                          <div key={msg.id} onClick={()=>setOptionValue(msg.messageAt)} id= {state.mode?"togSentDark" : "togSentLight"} className= {msg.senderID==currentUserId?'sent':'receive'}>
                              <div style={optionValue === msg.messageAt && msg.senderID == currentUserId?{display:'flex'} : {display:'none'}} className={msg.senderID==currentUserId?'sentDelete':'receiveDelete'}><MdDelete onClick={()=>deleteMessage(msg.id)}/></div> 
                              {msg.pic? (<><div className='imgNname'><img src ={msg.profilePic} className='user-image'/> {msg.username}</div> <img src ={msg.pic} style={{borderRadius:'10px', border:'1px solid black'}}  height ='100%' width='100%'/> {msg.user_message}</>) : (<><div className='imgNname'><img src ={msg.profilePic} className='user-image'/> {msg.username}</div> {msg.user_message}</>)}
                              <div className='sub'> {msg.createdAt}</div>
                        </div>                        
                    </div>
                    ))}
                {imageUpload?(<div className='sent' style = {{width:'50%', left:'50%'}}>uploading... </div>): (null)}
                </div>):null)}


                <div className='inputNSend'>
                    <input type='text' value={formValue} id ={state.mode?"togInputDark" : "togInputLight"} className='messageInput' 
                    onChange={(e) =>setFormValue(e.target.value) } placeholder='type message...'/>

                    <input type='file'  style={{display :'none'}} onChange={(e) => setImage(e.target.files[0])} id='file'/>
                    <label htmlFor='file'  id ={state.mode?"togPicDark" : "togPicLight"} className='picUpload'>
                      <div className='picUpload'><BiSolidImageAdd /></div>
                    </label>

                    <button type='submit' id ={state.mode?"togSendDark" : "togSendLight"} onClick={sendMessage}
                    className='sendMes'><IoIosSend /></button>
                </div>
            </div>
        </>
    )}

