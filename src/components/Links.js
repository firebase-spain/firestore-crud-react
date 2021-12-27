import React, { useEffect, useState } from 'react';
import LinkForm from './LinkForm';
import db from '../firebase';
import { collection, addDoc, doc,  deleteDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';


export default function Link() {
    const[links, setLinks] = useState([])
    const[currentId, setCurrentId] = useState('')
    
    const addOrEditLink = async (linkObject) => {
        const collectionRef = collection(db, "Links" );
        const payload = linkObject;
        
        try {
            if (currentId === '') {
                const docRef = await addDoc(collectionRef, payload);
                toast(`New link added: ${docRef.id}`, {
                    type: 'success'
                });
            } else {
                const docRef =await updateDoc(doc(db, 'Links', currentId), linkObject)
                toast(`Link updated successfully`, {
                    type: 'info'
                });
                setCurrentId('')
            }
        } catch (error) {
           console.log(error) 
        }
    }

    useEffect(
        () => {
           onSnapshot(collection(db, "Links"), (snapshot) =>
           setLinks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          )
        },
        []
      );

    const onDeleteLink = async (id) => {
        if (window.confirm('Are you sure you want to delete this link?')) {
            await deleteDoc(doc(db, 'Links', id));
            toast('Link removed successfully', {
                type: 'error',
                autoClose: 2000
            });
        }
        
    }  

    return (
        <div className='row'>
            <div className='col-md-4 p-2'>
                <LinkForm {...{addOrEditLink, currentId, links}} />
            </div>
            <div className='col-md-8 p-2'>
                    {links.map((link) => (
                            <div className='card mb-1' key={link.id}>
                                <div className='card-body'>
                                    <div className='d-flex justify-content-between'>
                                        <h4>{link.name}</h4>
                                        <div>
                                            <i className='material-icons text-danger' onClick={() => onDeleteLink(link.id)}>close</i>
                                            <i className='material-icons' onClick={() => setCurrentId(link.id)}>create</i>
                                        </div>
                                    </div>
                                    <p>{link.description}</p>
                                    <a href={link.url} target="_blank">Go to Website</a>
                                </div>
                            </div>
                        ))}
            </div>
            {/* <ul>
                {links.map((link) => (
                <li key={link.id}>
                    <a href={link.url}>{link.name}</a>
                </li>
                ))}
            </ul> */}
        </div>
    )
}



/*
// Doc
// https://pablomonteserin.com/curso/react/firebase/

import firebase, { db } from 'path/to/firebase';
import {collection, getDocs, getDoc, query, doc,  addDoc, deleteDoc, updateDoc} from "firebase/firestore";

// ALTA
addDoc(collection(db, 'persons'), { name });

// CONSULTA
const result = await getDocs(query(collection(db, 'persons')));

// REMOVE
await deleteDoc(doc(db, 'persons', id));

// UPDATE
await updateDoc(doc(db, 'persons', id), {name})

*/
