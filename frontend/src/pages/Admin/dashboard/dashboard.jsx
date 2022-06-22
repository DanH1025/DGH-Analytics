import React from 'react'

import './dashboard.css'

import {useState} from 'react'
// import {Link} from 'react-router-dom'

// import {Switch,Router, BrowserRouter,Route} from 'react-router-dom';

//imports for material ui menu navigation

import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import WishList from '../../ProductManager/wishlist/wishlist';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import ProductList from '../../../components/ProductManager/productList/productList';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import AddProduct from '../../../components/ProductManager/addProduct/addProduct'
import Home from '../../../components/Admin/home/home';
import DetailSalesAnalysis from '../../../components/Admin/detailSalesAnalysis/detailSalesAnalysis';
import DetailAverage from '../../../components/Admin/detailAverageAnalysis/detailAverage';
import DetailSessionAnalysis from '../../../components/Admin/detailSessionAnalysis/detailSesionAnalysis';

import { Button } from '@material-ui/core'
//material ui menu navigation drawer things
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { ListAltOutlined } from '@material-ui/icons';
import Orders from '../../../pages/ProductManager/orders/orders';
import Hiring from '../../../components/Admin/Hiring/hiring';
import Profile from '../../../components/Admin/Profile/profile'
import UsersList from '../../../components/Admin/usersList/usersList';
import DetailDeviceAnalysis from '../../../components/Admin/detailDeviceAnalysis/detailDeviceAnalysis';
import DetailLocationAnalysis from '../../../components/Admin/detailLocationAnalysis/detailLocationAnalysis';
import { getAdminUserName } from '../../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DetailTopProductAnalysis from '../../../components/Admin/detailTopProductAnalysis/detailTopProductAnalysis'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);


export default function PM_Dashboard() {
  
  // // handle the state of the sidebar slider
  // const [sidebarCollapsed , setSidebarCollapsed] = useState(false);
  // // handle the state of the body components
  //   
  //     const handlerSidebarCollapse = () =>{
    //           setSidebarCollapsed(!sidebarCollapsed);
    //       }
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    console.log(cookies.ADemail)

    useEffect(()=>{
        dispatch(getAdminUserName(cookies.ADemail));
    },[])

    const data = useSelector((state) => state.getUser)
    const {user , loading , error} = data;


    console.log(user);


    //material ui menu navigation
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    //track index of the components clicked
    const [compCounter , setCompCounter] = useState(0);
    

    const handleLogout = (e) => {
      e.preventDefault();
      removeCookie('ADemail', {path: '/'});
      removeCookie('ADrole', {path: '/'});
      removeCookie('ADaccess_token', {path: '/'});
      navigate('/adminstrationLogin');
    }

  return (  
    <>
       <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>          
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
              {
                loading? <p>Loading...</p> : error? <p>{error}</p>:
                (
                  <div className="Admin_profileInfoHolder">
                  <div className='Admin_profileInfWrapper' >
                       <div className="Admin_profileIconHolder"  onClick={()=>setCompCounter(1)}>
                          <AccountCircleIcon/>
                       </div>
                       <div className="Admin_profileInfo">
                              <p>{user.user_name}</p>  
                              <span>{cookies.ADemail}</span> 
                       </div>
                       <div className="logoutButtonHolder">
                          <ExitToAppIcon   onClick={handleLogout} />
                       </div>
                  </div>
              </div>
                )
              }           
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <div className="imgHolder">
            <img className='admin_logo_img' src="https://cdn-icons-png.flaticon.com/512/732/732204.png" alt="Logo" />
            <span>ADMIN</span>

          </div>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Dashboard', 'Profile', 'Product List', 'Add Products','Users', 'Order List','Hiring'].map((text, index) => (
            <>
            <ListItem button  onClick={()=>{
              setCompCounter(index)
              console.log(index)
              }}   key={text}>
              <ListItemIcon>{index === 0 ? <DashboardOutlinedIcon /> :
                  index === 1 ? <AccountCircleIcon />:
                  index === 2 ? <ListAltOutlinedIcon />:
                  index === 3 ? <AddCircleOutlineOutlinedIcon />:
                  index === 4 ? <FavoriteBorderOutlinedIcon/> : 
                  index === 5 ? <GroupOutlinedIcon/> :
                  index === 6 ? <ListAltOutlined/> :
                  index === 7 ? <TrackChangesIcon/> :
                   ""
                             
                             }
              </ListItemIcon>
              
              <ListItemText primary={text} />
              
            </ListItem>
            <Divider />
            </>
            
          ))}
           
        </List>
      
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

            {compCounter === 0 ? <Home onMorePage={setCompCounter}/> : 
             compCounter === 1 ? <Profile userName={user.user_name}  email={user.email} role={user.user_role} signUpDate={user.sign_up_date} />:
             compCounter === 2 ? <ProductList /> : 
             compCounter === 3 ? <AddProduct onMorePage={setCompCounter}/> :             
             compCounter === 4 ? <UsersList/>:
             compCounter === 5 ? <Orders />: 
             compCounter === 6 ? <Hiring />:
             compCounter === 7 ? <DetailSalesAnalysis onMorePage={setCompCounter} />:
             compCounter === 8 ? <DetailAverage onMorePage={setCompCounter}/>:
             compCounter === 9 ? <DetailSessionAnalysis onMorePage={setCompCounter}/>:
             compCounter === 10 ? <DetailDeviceAnalysis onMorePage={setCompCounter}/>:
             compCounter === 11 ? <DetailLocationAnalysis onMorePage={setCompCounter}/>:
             compCounter === 12 ? <DetailTopProductAnalysis onMorePage={setCompCounter}/>:
             "others"   
            }

      </main>
    </div>

    </>
  )
}




