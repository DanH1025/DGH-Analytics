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

import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import WishList from '../../ProductManager/wishlist/wishlist';
import Orders from '../../ProductManager/orders/orders';
import ProductList from '../../../components/ProductManager/productList/productList';
import AddProduct from '../../../components/ProductManager/addProduct/addProduct'
import Home from '../../../components/Admin/home/home';


//material ui menu navigation drawer things




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
 

    //material ui menu navigation
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    //track index of the components clicked
    const [compCounter , setCompCounter] = useState(0);


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
            profile Info
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
          {['Dashboard', 'Product List', 'Add Products', 'WishList'].map((text, index) => (
            
            <ListItem button  onClick={()=>{
              setCompCounter(index)
              console.log(index)
              }}   key={text}>
              <ListItemIcon>{index === 0 ? <DashboardOutlinedIcon /> :
                             index === 1 ? <ListAltOutlinedIcon />:
                             index === 2 ? <AddCircleOutlineOutlinedIcon />:
                             index === 3 ? <FavoriteBorderOutlinedIcon/> : <FavoriteBorderOutlinedIcon/> }</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Order List', 'Order Details', 'Updates'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <ListAltOutlinedIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Analysis', 'Goals', 'Params'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

            {compCounter === 0 ? <Home /> : 
             compCounter === 1 ? <ProductList /> : "others"

            }

   

      </main>
    </div>

    </>
  )
}













// <Layout style={{ minHeight: '100vh' }}>
    //   <Sider 
    //   collapsible collapsed={sidebarCollapsed} 
    //   onCollapse={handlerSidebarCollapse} width='220' >
      
    //     <div className="pm_dash_logo" > 
    //       <h1>LOGO</h1> 
    //     </div>
    //     <Menu theme="dark" 
    //       defaultSelectedKeys={['sub_dashboard']}     
    //       mode="inline">
         
    //       <Menu.Item key="sub_dashboard" 
    //           onClick={()=> setCompCounter("0")}                           
    //           icon={<UserOutlined />}>           
    //             Dashboard           
    //       </Menu.Item>
    //       <SubMenu 
    //         key="sub_products" 
    //         icon={<ShopOutlinedIcon />} 
    //         title="Products">
    //         <Menu.Item key="menu_product_list" 
    //           onClick={()=>setCompCounter("2")} 
    //           icon={<ListAltOutlinedIcon/>}>
    //             Product List
    //         </Menu.Item>      
    //         <SubMenu key="sub_product_manager"  
    //           icon={<TuneOutlinedIcon/>} 
    //           title="Product Manager">
    //             <Menu.Item key="menu_add_products"  
    //               onClick={()=>setCompCounter("3")}  
    //               icon={<AddCircleOutlineOutlinedIcon/>} >
    //                 Add Products
    //             </Menu.Item>               
    //         </SubMenu>  
    //       </SubMenu>

    //       <Menu.Item key="menu_wishlist" 
    //         icon={<PieChartOutlined />}>
    //           WishList
    //       </Menu.Item>
    //       <Menu.Item key="menu_advertisment" 
    //         icon={<PieChartOutlined />}>
    //           Advertisment
    //       </Menu.Item>
    //       <Menu.Item key="menu_updates" 
    //         icon={<PieChartOutlined />}>
    //           Updates
    //       </Menu.Item>
    //       <SubMenu key="sub_orders" 
    //       icon={<TeamOutlined />} 
    //       title="Orders">
    //         <Menu.Item key="mennu_order_list" 
    //           onClick={()=>setCompCounter("4")} >
    //           Order List
    //         </Menu.Item>
    //         <Menu.Item key="menu_order_details">
    //           Order Details
    //         </Menu.Item>
    //       </SubMenu>
       
    //   </Menu>
    // </Sider>

    //   <Layout className="site-layout">
    //   <Header className='pm_dash_header' />
    //     <Content style={{ margin: '0 16px' }}>
    //       <Breadcrumb style={{ margin: '16px 0' }}>
    //         <Breadcrumb.Item>
    //           {compCounter === "0" ? "Dashbord" :
    //            compCounter === "1" ? "Profile" : 
    //            compCounter === "2"? "Product List" : 
    //            compCounter === "3" ? "Add Product" : 
    //            compCounter === "4"? "Others" : "" }
    //         </Breadcrumb.Item>
    //       </Breadcrumb>
    //       <div className="site-layout-background" 
    //         style={{ padding: 0, minHeight: 360 }}>
    //           {compCounter === "0" ? <Home /> : 
    //            compCounter === "1" ? <WishList />:
    //            compCounter === "2" ? <ProductList/>:
    //            compCounter === "3" ? <AddProduct/>:
    //            compCounter === "4" ? <Orders/> : "others"
    //           }               
    //       </div>
    //     </Content>
    //     <Footer style={{ textAlign: 'center' }}>

    //     </Footer>
    //   </Layout>
    // </Layout>