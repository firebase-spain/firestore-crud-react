import { dblClick } from '@testing-library/user-event/dist/click';
import React, { useState, useEffect } from 'react';
import db from '../firebase';
import { collection, getDoc, doc, query, where } from "firebase/firestore";

export default function LinkForm(props) {

    const initialStateValues = {
        url: '',
        name: '',
        description: ''
    } 

    const [values, setValues] = useState(initialStateValues);

    const handleSubmit = e => {
        e.preventDefault()
        props.addOrEditLink(values)
        setValues({...initialStateValues})
        
    }

    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }

    const getLinkById = async (id) => {
        const linkSnapshot = await getDoc(doc(db, 'Links', id));
        if (linkSnapshot.exists()) {
            // console.log(linkSnapshot.data());
            // return noteSnapshot.data();
            setValues({...linkSnapshot.data()})
            
        } else {
            console.log("Note doesn't exist");
        }
    }

    useEffect(() => {
         if (props.currentId === '' ){
             setValues({ ...initialStateValues });
         } else {
            getLinkById(props.currentId)
         }
    }, [props.currentId])

    return (
        <form className='card card-body' onSubmit={handleSubmit}>
            <div className='form-group input-group'>
                <div className='input-group-text bg-light'>
                    <i className="material-icons">insert_link</i>
                </div>
                <input type="text" className='form-control'
                        onChange={handleInputChange}
                        value={values.url}
                        placeholder='https://someurl.com' name="url"/>
            </div>
            <br/>
            <div className='form-group input-group'>
                <div className='input-group-text bg-light'>
                    <i className="material-icons">create</i>
                </div>
                <input type="text" className='form-control'
                        onChange={handleInputChange}
                        value={values.name}
                        placeholder='Website name' name="name"/>
            </div>
            <br/>
            <div className='form-group input-group'>
                <textarea name="description" rows="3" className='form-control'
                    onChange={handleInputChange}
                    placeholder='write a description'
                    value={values.description}
                ></textarea>
            </div>
            <br/>
            <button className='btn btn-primary btn-block'>
                {props.currentId === '' ? 'Save': 'Update'}
            </button>

        </form>
    )
}


//  Doc
/* 

https://travis.media/how-to-use-firebase-with-react/#20211130-getDoc

import { db } from '../utils/firestore'; // update with your path to firestore config
import { doc, setDoc } from "firebase/firestore"; 

export const createNote = async (note) => {
    await setDoc(doc(db, 'notes', note.id), note);
};
createNote(note);
addDoc
Sometimes you do not have a meaningful ID that you want to use and thus want Firestore to create a unique one for you. For this, you use addDoc.

import { db } from '../utils/firestore'; // update with your path to firestore config
import { doc, addDoc } from "firebase/firestore"; 

export const createNote = async (note) => {
    await addDoc(collection(db, 'notes'), coin);
};
createNote(note);
getDoc
import { db } from '../utils/firestore'; // update with your path to firestore config
import { doc, getDoc } from "firebase/firestore";

export const getNote = async (id) => {
    const noteSnapshot = await getDoc(doc(db, 'notes', id));
    if (noteSnapshot.exists()) {
        return noteSnapshot.data();
    } else {
        console.log("Note doesn't exist");
    }
};
getNote(id);
getDocs
import { db } from '../utils/firestore'; // update with your path to firestore config
import { collection, getDocs } from "firebase/firestore";

export const getNotes = async () => {
    const notesSnapshot = await getDocs(collection(db, "notes"));
    const notesList = notesSnapshot.docs.map((doc) => doc.data());
    return notesList;
};
getNotes();
updateDoc
To update some of the fields without overwriting the entire document, use updateDoc().

import { db } from '../utils/firestore'; // update with your path to firestore config
import { doc, updateDoc } from "firebase/firestore";

export const updateNote = async (note) => {
    const noteRef = doc(db, "notes", note.id);
    await updateDoc(noteRef, {
        description: "New description"
    });
};
updateNote(note);
deleteDoc
import { db } from '../utils/firestore'; // update with your path to firestore config
import { doc, deleteDoc } from "firebase/firestore";

export const deleteNote = async (note) => {
    const noteRef = doc(db, "notes", note.id);
    await deleteDoc(noteRef);
};
deleteNote(note);

*/
