import React from 'react'
import './employeeCard.css'


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import { message } from 'antd';




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  })

export default function EmployeeCard({key, user_name, email, accessKey, status , date}) {

    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleActivation = async() =>{
    
    const response = await axios.post('http://localhost:5000/api/activation', {
        email: email
    })
    console.log(response.data.message);
    
    if(response.data.isSuccess){
        message.success("User Has Been Activated")
        setOpen(false);
    }else{
        message.error("User Activation Has Failed");
        setOpen(false);
    }
    
  }

  return (
      <>   
    <div className='employeeCard' onClick={handleClickOpen}  >
        <div className="EC_wrapper">
            <div className="emp_name_holder">
                <p>{user_name === null ? "Unavailable" : user_name}</p>
            </div>
            <div className="emp_email_holder">
                <p>{email}</p>
            </div>
            <div className="emp_accessKey_holder">
                <p>{date}</p>
            </div>
            <div className="emp_status_holder">
                <p>{status}</p>
            </div>
        </div>
       
    </div>


    <div>
     
      <Dialog
        
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{user_name === null ? "Unavailable" : user_name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
                <p className='dialog_email'>  <b>Email :</b> {email}</p>
                <p className='dialog_access_key'><b>Access Key :</b> {accessKey}</p>
                <p className='dialog_date'><b>SignUp Date :</b> {date}</p>
                <p className='dialog_status'> <b>Status : </b> {status}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>  
        <Button onClick={handleActivation} color="primary">
            Activate
          </Button>        
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>



      </>
  )
}
