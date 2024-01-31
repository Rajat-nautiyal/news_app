import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {setDoc, collection, doc,updateDoc, serverTimestamp, arrayUnion } from 'firebase/firestore';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth, firestore,storage} from '../firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { useNavigate } from 'react-router-dom';
import { MdAddPhotoAlternate } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import '../chat.css/Sign.css'
import { MdLogin } from "react-icons/md";

function SignUpAuth() {
    const [userName, setUserName] = useState("");
    const [pic, setPic] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const randomPic = `https://firebasestorage.googleapis.com/v0/b/fir-chatapp-82a43.appspot.com/o/chat_pics%2Fmessages%2Fdownload.png?alt=media&token=de4f6ae9-a9eb-4cdf-9719-274c0658cbfd`
    const navigate = useNavigate()
    const allUsersRef = collection(firestore, 'allUsers')

    const addUserDoc= async(photoUrl,displayName,uid)=>{
        await setDoc(doc(firestore, "allUsers", uid),(allUsersRef, {
                username: userName? userName.toLocaleLowerCase(): displayName.toLocaleLowerCase(),
                originalUsername:userName? userName : displayName,
                photoUrl:photoUrl?photoUrl:randomPic,
                userCreatedAt: serverTimestamp(),
                friends: [],
                user_id: uid,
                }))
    }   

    const addtoGroup= async(photoUrl,displayName,uid)=>{
        await updateDoc(doc(firestore, "groups", 'AenyHhj56yKLx6v2hMnt'), {
                friends: arrayUnion(uid)
                })
    }   

    const signUp = async(e) => {
        e.preventDefault()
        if(pic)
        {
            createUserWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                console.log(userCredential.user);
                setLoading(true)
                const storageRef = ref(storage, `/chat_pics/profile/${pic.name}`)
                await uploadBytes(storageRef, pic).then(async(snapshot)=>{
                    await getDownloadURL(snapshot.ref).then((url)=>{
                        // console.log(url)
                        addUserDoc(url,null, userCredential.user.uid)
                        addtoGroup(null,null, userCredential.user.uid)
                        navigate('/');      
                        setErrorMessage('')      
                        setLoading(false)
                        })
                    })
                }).catch((error) => {
                    // console.log(error.message);
                    setErrorMessage(error.message)
                })
        } else
            createUserWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                    console.log(userCredential.user);
                    addUserDoc(null,null, userCredential.user.uid)
                    addtoGroup(null,null, userCredential.user.uid)
                    navigate('/');  
                    setErrorMessage('')          
                }).catch((error) => {
                    setErrorMessage(error.message)          
                })
    };

    const GoogleSignIn = async() => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                addUserDoc(result.user.photoURL,result.user.displayName, result.user.uid)
                addtoGroup(null,null, result.user.uid)
                navigate('/')
                setErrorMessage('')
                // console.log(result.user);
            })
            .catch((error) => {
                console.log(error.message);
                setErrorMessage(error.message)
            });
    };

    return (
        <>
            <div className='wholeBody'>
                <form className='formDetails'>
                    <h2 style={{letterSpacing:'1px', color:'#ffff', paddingBottom:'5px'}}>Create Your Profile</h2>
                    <input type='text' className = 'input' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='type your name'/>
                    <input type='file'  style={{display :'none'}} onChange={(e) => setPic(e.target.files[0])} id='file'/>
                    <label htmlFor='file' className = 'input' id = 'files' style={{display:'flex'}}>
                        <div>choose your pic</div>
                        <MdAddPhotoAlternate style={{fontSize:'1.3em'}} id='svg'/>
                    </label>
                    <input type='email'className = 'input' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='type email'/>
                    <input type='password' className = 'input' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='type password' />
                </form>
                <div className='three'>
                    <button onClick={signUp} className='submit'>Submit</button>
                    <div style={{fontWeight:'600'}}>or</div>
                    <div onClick={GoogleSignIn} className='googleSign'><FcGoogle style={{fontSize:'1.27em'}}/>Sign In with Google</div> 
                    <div className='parentLogin' style={{paddingTop:'5px'}}><div>Already exist?</div> <Link to ="/LogIn" className='login'>Login page <MdLogin style={{fontSize:'1.35em'}} /></Link></div>
                    <div style={{height:'10px'}}>{errorMessage?(<div style={{color:'red',height:'10px'}}>{errorMessage}</div>):(loading?<div style={{color:'yellow',height:'10px'}}>Loading please wait</div>:null)}</div>
                </div>
            </div>
        </>
    );
}

export default SignUpAuth;
