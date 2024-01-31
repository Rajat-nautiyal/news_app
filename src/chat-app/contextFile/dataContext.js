import {createContext} from "react";
import {useState, useEffect} from 'react'
import { addDoc, getDoc, setDoc,getDocs, collection, doc,query , where, serverTimestamp} from 'firebase/firestore';
import {auth, firestore} from '../firebase'

export const AllUserContext = createContext();

