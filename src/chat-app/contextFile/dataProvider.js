import { useState, useEffect } from 'react';
import { getDocs, collection, onAuthStateChanged } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { AllUserContext } from './dataContext.js';
import { useReducer } from 'react';

export const DataProvider = ({ children }) => {
  const [allUserData, setAllUserData] = useState([]);
  const [messageData, setMessageData] = useState([]);

  const allUsersRef = collection(firestore, 'allUsers');
  const messageRef = collection(firestore, 'messages');

  const FetchData = async () => {
    try {
      const allUserDocs = await getDocs(allUsersRef);
      const messageDocs = await getDocs(messageRef);
      
      const allUserDataArray = allUserDocs.docs.map((doc) =>  ({...doc.data(), id:doc.id}));
      const messageDataArray = messageDocs.docs.map((doc) => ({...doc.data(), id:doc.id}));
      // console.log('fetchData')
      setAllUserData(allUserDataArray);
      setMessageData(messageDataArray);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const messCollec=async()=>{
    try {
      const messageDocs = await getDocs(messageRef);
      const messageDataArray = messageDocs.docs.map((doc) => ({...doc.data(), id:doc.id}));
      setMessageData(messageDataArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }

    const initial_state ={
      mode:null,
      chatId:'',
      searchId:'',
      userId:'',
      groupId:'',
      bool:null,
      isBacked:true
    }

    const modeReducer = (state, action) => {
      const currentUserId = auth.currentUser.uid;
      // console.log(action.payload)
      switch (action.type) {
        case 'darkNlight':
          return {
            ...state,  // Include the existing state
            mode: action.payload,
          };
        case 'chatId':
          return {
            ...state, 
            chatId: currentUserId>action.payload? (currentUserId + action.payload) : (action.payload + currentUserId),
            searchId:'',
            userId:action.payload,
            groupId:'',
          }
        case 'searchId':
          return {
            ...state, 
            searchId: currentUserId>action.payload? (currentUserId + action.payload) : (action.payload + currentUserId),
            chatId:'',
            userId:action.payload,
            groupId:'',
          }
          case 'bool':
            return {
              ...state,  // Include the existing state
              bool: action.payload,
            };
          case 'groupId':
            return {
              ...state, 
              searchId: '',
              chatId:'',
              userId:'',
              groupId:action.payload,
            }
            case 'isBacked':
            return {
              ...state,  // Include the existing state
              isBacked: action.payload,
            };
  
        default:
          return state;
      }
    };
  const [state , dispatch]= useReducer(modeReducer, initial_state)

  useEffect(() => {
    FetchData();
  }, [state.chatId,state.searchId]);

  useEffect(() => {
    messCollec();  
  }, [state.chatId, state.bool]);


  return (
    <AllUserContext.Provider value={{allUserData, messageData, state, dispatch }}>
      {children}
    </AllUserContext.Provider>
  );
};
