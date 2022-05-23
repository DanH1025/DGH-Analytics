import React from 'react'
import './employeeCard.css'


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';




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
                <p className='dialog_email'>Email : {email}</p>
                <p className='dialog_access_key'>Access Key : {accessKey}</p>
                <p className='dialog_date'>SignUp Date : {date}</p>
                <p className='dialog_status'>Status : {status}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>          
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>



      </>
  )
}
