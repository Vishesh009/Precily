import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import {deleteData } from '../Redux/Actions'

//Material-ui
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './Data.css'
import Form from './Form';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
        backgroundColor:theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const Data = () => {
    


    const data = useSelector(state=> state.data)
    const dispatch = useDispatch()

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [doc, setDoc] = React.useState();
  
    const handleOpen = (e,row) => {
        e.preventDefault()
        setDoc(row)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const {docs, loading} = data
    const handleDelete = (e, data)=> {
        e.preventDefault()
        console.log(`delete`, data)
        dispatch(deleteData(data))
    }
    // const handleUpdate = (e, data) =>{

    // }

// 

    return (
        
        <div className='data-list'>
            {
                loading ? <h1>LOADING... </h1> :
                <>    
                <div className='form-link' ><Link to='/'>⬅Add Data</Link></div>
    <table  className='table'>
        <thead>
          <tr className='head-row'>
            <th className='table-heading'>ID</th>
            <th className='table-heading'>TITLE</th>
            <th  className='table-heading'>BODY</th>
            <th className='table-heading'>USER ID</th>
            <th className='table-heading'>Actions</th>
          </tr>
        </thead>
        <tbody>    
        {docs.map(row=>(
            <React.Fragment key={row.id}>
            <tr className='table-row'>
              <td className='table-cell' >
                {row.id}
              </td>
              <td className='table-cell table-cell-tc-right' >{row.title}</td>
              <td  className='table-cell table-cell-tc-right'  >{row.body}</td>
              <td className='table-cell'  >{row.userId}</td>
              <td style={{textAlign:'center'}}>
                  <div className='action-button'>
                <button  className='button' onClick={(e)=>handleOpen(e, row)}> Update </button>
                <button className='button' onClick={(e)=>handleDelete(e, row)}> Delete </button>
                </div>
                </td>
            </tr>
   
            </ React.Fragment>
            ))}
            </tbody >
        </table >
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
             <Form data={doc} handleClose={handleClose}/>
            </Fade>
          </Modal>
        </>
        }
</div >
    )
}

export default Data
