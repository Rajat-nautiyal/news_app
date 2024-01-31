import { useState, useContext } from 'react';
import {auth} from '../firebase.js';
import { signOut } from 'firebase/auth';
import {AllUserContext} from '../contextFile/dataContext.js'
import { useNavigate } from 'react-router-dom';
import { MdOutlineLightMode } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { ImFire } from "react-icons/im";
import { FaMoon } from "react-icons/fa6";
import '../chat.css/home.css'
import '../chat.css/top-header.css'

export const TopHeader =()=>{
    const {state, dispatch} = useContext(AllUserContext)
    const navigate = useNavigate()
    const [mode, setMode]= useState(true)
    // const[mode , setMode] = useState(false)

    const darkMode =()=> {
        setMode(!mode)
        dispatch({type : 'darkNlight', payload: mode})
    }
    const logOut = () => {
        signOut(auth)
        .then(()=>{
            console.log('log out successfuly')
            navigate('/login')
        })
        .catch((e)=>console.log(e))
    }

    
    return(
        <>
            <div id= {state.mode?"toggleDark" : "toggleLight"} className='top_header'>
               <div className='fireChat'><ImFire style={{color: 'orange'}}/>Fire-Chat</div>
                <div className='darkNLog'>
                    <div onClick={darkMode} id='darkmode'>{state.mode?<FaMoon style={{color:'#ffff'}}/>:<MdOutlineLightMode/>}</div>
                    <div onClick={logOut} className='logout'><IoIosLogOut/></div>
                </div>
            </div>

        </>
    )
}