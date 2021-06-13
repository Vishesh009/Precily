import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postData } from '../Redux/Actions'
import './Form.css'
import precily from './precily.png'

const Form = (props) => {

 
    const [id, setId] = useState(props.data?.id ? props.data?.id : '')
    const [title, setTitle] = useState(props.data?.title ? props.data?.title : '')
    const [body, setBody] = useState(props.data?.body ? props.data?.body : '')
    const [userId, setUserId] = useState(props.data?.userId ? props.data?.userId : '')
    const data = useSelector(state=> state.data)
    const { error } = data

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {id, title, body, userId}
        await dispatch(postData(data))
        if(window.location.pathname != '/data' && error == null){
            props.history.push('/data')
        }else{
            error == null &&
            props?.handleClose();
        }
    }
    const handleViewData = (e) => {
        e.preventDefault()
        props.history.push('/data')
    }

    return (
        <div className="alltabs">
        <div className="maintab">
            <div className="sidenav">
                <img src={precily} alt = "precily" ></img>
                <a class="active" href="#home">Industries</a>
                <a href="#news">Careers</a>
                <a href="#contact">Resources</a>
                <a href="#about">About Us</a>
            </div>
            <div className='form'>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <ul className='form-container'>
                <li>
                    <h2>ADD DATA</h2>
                </li>
                {/* {loadingSave &&  <li> <Loading></Loading></li>} 
                {errorSave && <li> <div>{error}</div></li>}  */}
                <li>
                    <label htmlFor='id'>ID</label>
                    <input value={id} type='text' name='id' id='id' onChange={(e)=> setId(e.target.value)} required />
                </li>
                <li>
                    <label htmlFor='title'>TITLE</label>
                    <input type='text' value={title} step="0.01" name='title' id='title' onChange={(e)=> setTitle(e.target.value)} />
                </li>

                <li>
                    <label htmlFor='body'>BODY</label>
                    <input type='text' value={body} name='body' id='body' onChange={(e)=> setBody(e.target.value) } required />
                </li>
                <li>
                    <label htmlFor='userid'>USERID</label>
                    <input type='text' value={userId} name='userid' id='userid' onChange={(e)=> setUserId(e.target.value)} required />
                </li>
   
                <li>
                    <button className='form-button-primary' type='submit' >
                         Submit 
                    </button>
                </li>
               { window.location.pathname == '/data'?  <li>
                    <button className='form-button-secondary'  onClick={props?.handleClose} >Back</button>
                </li>: 
                <li>
                <button className='form-button-secondary' onClick={e=>handleViewData(e)} >VIEW DATA</button>
            </li>
}
            {error &&   <li style={{color: 'red'}}>{error}</li>}
            </ul>
        </form>
        </div>
        </div>
        <div className="footer">
        <p>Bringing <b>Efficiency</b> and <b>Automation</b> to your workflows.</p>
        <p>Precily AI &middot; Official Website</p>
        </div>
        </div>
    )
}

export default Form
