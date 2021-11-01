import React, {useEffect, useState} from 'react'
import LinkForm from './LinkForm'
import firebase from '../utils/firebase';
import { toast } from 'react-toastify';

import 'firebase/firestore';
firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);



export default function Links() {
    const [links, setlinks] = useState([])
    const [currentId, setcurrentId] = useState('')

    const getLinks = async () => {
        //! Si queremos ejecutarlo cada ves que cambie
        db.collection('links').onSnapshot(
            (querySnapshot) => {
                const docs = [];
                querySnapshot.forEach( doc => {
                    docs.push({...doc.data(), id:doc.id});
                });
                setlinks(docs)
            }
        );
       

        //! Si queremos ejecutarlo una sola ves
        // const querySnapshot = await db.collection('links').get();
        // querySnapshot.forEach( doc => {
        //     console.log(doc.data());
        // })
    }

    useEffect(() => {
        getLinks();
    }, []);

    const addOrEditLink = async (linkObject) => {
     try {
        if (currentId === '') {
            await db.collection('links').doc().set(linkObject)
            toast('New Link Added', {
                type: 'success',
                autoClose: 1000
            })
             } else {
                 await db.collection('links').doc(currentId).update(linkObject)
                 toast('Link Updated Successfully', {
                     type: 'info',
                     autoClose: 1000
                 });
                 setcurrentId('')
             }
     } catch (error) {
        toast(error, {
            type: 'error',
            autoClose: 1000
        });
     }
    }

    const onDeleteLink = async (id) => {
       if (window.confirm('are you sure you want to delete this link')) {
           await db.collection('links').doc(id).delete();
           toast('link removed successfully', {
                type: 'error',
                autoClose: 2000
            })
       }
    }

    return (
        <>
            <div className="col-md-4 p-2">
              <LinkForm {...{addOrEditLink, currentId, links}}/>
            </div>
            
            <div className="col-md-8 mt-1">
                {links.map(link => {
                    return (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div>
                                    <i className="material-icons text-danger"
                                        onClick={() => onDeleteLink(link.id)}
                                    >closes</i>
                                    <i className="material-icons"
                                        onClick={() => setcurrentId(link.id) }
                                    >create</i>
                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" 
                                rel="noopener noreferrer"
                            >Go to Website</a>
                        </div>
                    </div>)
                })}
            </div>
        </>
    )
}
