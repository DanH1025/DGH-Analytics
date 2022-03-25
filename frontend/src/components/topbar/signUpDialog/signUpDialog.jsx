import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function SingUpDialog() {

  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);

  const handleClickOpenLogin = () => {
      setOpenSignUp(false);
      setOpenLogin(true);
  };
  const handleClickOpenSignUp = () =>{
      setOpenLogin(false)
      setOpenSignUp(true);
  }

  const handleDialogClose = () => {
      setOpenSignUp(false);
      setOpenLogin(false);
  };


  return (
    <>
    <Dialog 
    open={openLogin} 
    onClose={handleDialogClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Login
      </DialogTitle>
      <DialogContent>
      <DialogContentText>
        Im A Returning Customer 
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="loginEmail"
        label="Email Address"
        type="email"
        fullWidth/>
      <TextField
          autoFocus
          margin="dense"
          id="loginPasswor"
          label="Password"
          type="password"
          fullWidth/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} variant='outlined'  color="primary">
          Login
        </Button>
        <Button onClick={handleClickOpenSignUp} variant='outlined' color="primary">
          Create an Account
        </Button>
      </DialogActions>
    </Dialog> 
    
    <Dialog open={openSignUp} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">SignUp</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Im A New Customer
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="first_name"
                    label="First Name"
                    type="text"
                    fullWidth
                />
                 <TextField
                    autoFocus
                    margin="dense"
                    id="last_name"
                    label="Last Name"
                    type="text"
                    fullWidth
                />
                 <TextField
                    autoFocus
                    margin="dense"
                    id="Email"
                    label="Email"
                    type="email"
                    fullWidth
                />
                 <TextField
                    autoFocus
                    margin="dense"
                    id="confirm_email"
                    label="Confirm Email"
                    type="email"
                    fullWidth
                />
                 <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                />
                 <TextField
                    autoFocus
                    margin="dense"
                    id="confirm_password"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDialogClose} variant='outlined'  color="primary">
                    Register
                </Button>
                <Button onClick={handleClickOpenLogin} variant='outlined' color="primary">
                    Login
                </Button>
                </DialogActions>
            </Dialog> 


            </>


  )
}