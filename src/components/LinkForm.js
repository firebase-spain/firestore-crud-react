import React, { useState, useEffect } from 'react'
import firebase from '../utils/firebase';
import { toast } from 'react-toastify';

import 'firebase/firestore';
firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

function LinkForm(props) {

    const { addOrEditLink } = props;

    const initialStateValue = {
        url: '',
        name: '',  
        description: '', 
    }

    const [values, setValues] = useState(initialStateValue);

    const handleInputChange = (e) => {
       const { name, value } = e.target
       setValues({...values, [name]:value})
    }

    const validateURL = str => {
        let res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res == null)
            return false;
        else
            return true;
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (validateURL(values.url)) {
            addOrEditLink(values);
            setValues({...initialStateValue})
            } else {
                return toast("Invalid URL", {
                    type: 'error',
                    autoClose: 1000
                });
            }
    }

    const getLinkById = async (id) => {
        const doc = await db.collection('links').doc(id).get();
        setValues({...doc.data()})
    }

    useEffect(() => {
        if (props.currentId  ===  '') {
            setValues({...initialStateValue})
        } else {
            getLinkById(props.currentId);
        }
    }, [props.currentId])

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light"><i className="material-icons">insert_link</i></div>
                <input type="text" className="form-control" placeholder="https://example.com"
                    name="url"
                    onChange={handleInputChange}
                    value={values.url}
                />
            </div>

            <br/>

            <div className="form-group input-group">
                <div className="input-group-text bg-light"><i className="material-icons">create</i></div>
                <input type="text" className="form-control" placeholder="name"
                    name="name"
                    onChange={handleInputChange}
                    value={values.name}
                    
                />
            </div>

            <br/>
            

            <div className="form-group input-group">
                <textarea className="form-control"
                          placeholder="Escribe una descripción"
                          name="description"
                          onChange={handleInputChange}
                          value={values.description}
                          rows="3"></textarea>
            </div>

            <br/>

            <button className="btn btn-primary btn-block"
            >{props.currentId === '' ? 'Save' : 'Update' }</button>

        </form>
    )
}

export default LinkForm
