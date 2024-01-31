import React from 'react';
import { useState, useContext , useEffect} from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import {DataProvider} from '../contextFile/dataProvider.js'
import {Chatroom} from './chatroom.js'
import { Navbar } from './navbar.js'
import {TopHeader} from './Topheader.js'
import {Sidebar} from './sidebar.js'
import {AllUserContext} from '../contextFile/dataContext.js'
import '../chat.css/home.css'
export const Home =()=>{
    const {state} = useContext(AllUserContext);
    const [isBacked , setIsBacked] = useState(null) ;
    const isMobile = useMediaQuery('(max-width: 768px)');

    const IsBack=()=>{
        setIsBacked(state.isBacked)
    }
    useEffect(()=>{
        IsBack()
    },[state.isBacked])
    return(
        <>
                <div className='wholeStruc'>
                    <TopHeader/> 
                    <div id='sideNchat'>
                    {isMobile?(<><div style={isBacked?{display:'flex',height:'100%',width:'100%'}:{display:'none',opacity:'0'}}><Sidebar /></div>
                        <div id='NavNchat' style={isBacked?{display:'none'}:{display:'block'}}>
                            <Navbar/>
                            <Chatroom/>
                        </div></>):(<><Sidebar/>
                        <div id='NavNchat'>
                            <Navbar/>
                            <Chatroom/>
                        </div></>)}
                    </div>
                </div>

        </>
    )
}