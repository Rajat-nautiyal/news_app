import { useState } from 'react';
import {setDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import {auth, firestore} from '../firebase'
import {useNavigate} from 'react-router-dom';
import {signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,} from 'firebase/auth';
import '../chat.css/Sign.css'
import { FcGoogle } from "react-icons/fc";
import '../chat.css/Sign.css'

export const LogInAuth =()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const allUsersRef = collection(firestore, 'allUsers')
    const randomPic = `https://firebasestorage.googleapis.com/v0/b/fir-chatapp-82a43.appspot.com/o/chat_pics%2Fmessages%2Fdownload.png?alt=media&token=de4f6ae9-a9eb-4cdf-9719-274c0658cbfd`

    const addUserDoc= async(photoUrl,displayName,uid)=>{
        await setDoc(doc(firestore, "allUsers", uid),(allUsersRef, {
                username: displayName.toLocaleLowerCase(),
                originalUsername: displayName,
                photoUrl:photoUrl?photoUrl:randomPic,
                userCreatedAt: serverTimestamp(),
                friends: [],
                user_id: uid,
                }))
    }

    const logIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                    // console.log(userCredential.user);
                    navigate('/')
                    setErrorMessage('')
                })
            .catch((error) => {
                    // console.log(error.message);
                    setErrorMessage('Invalid email or password')
                });
        };

        const GoogleSignIn = () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
                .then((result) => {
                    addUserDoc(result.user.photoURL,result.user.displayName, result.user.uid)
                    navigate('/')
                    setErrorMessage('')
                })
                .catch((error) => {
                    // console.log(error.message);
                    setErrorMessage('Invalid email or password')
                });
        };

        const handleButtonClick = () => {
            navigate('/SignUp'); // Navigates to the "/SignUp" route
          };
    
        return (
            <>
                <div className='wholeBody'>
                    <form className='formDetails'>
                        <h2 style={{letterSpacing:'1px', paddingBottom:'5px'}}>Sign In</h2>
                        <input type='email'className = 'input' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='type email'/>
                        <input type='password' className = 'input' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='type password' />
                    </form>
                    <div className='three'>
                        <button onClick={logIn} className='submit'>Submit</button>
                        <div style={{fontWeight:'600'}}>or</div>
                        <div onClick={GoogleSignIn} className='googleSign'><FcGoogle style={{fontSize:'1.27em'}}/>Sign In with Google</div> 
                        <div className='createUser' onClick ={handleButtonClick}>Create an user</div>
                        <div style={{color:'red',height:'10px'}}>{errorMessage?errorMessage:null}</div>
                    </div>
                </div>
            </>
        );
    }
