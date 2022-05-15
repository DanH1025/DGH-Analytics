import React from 'react'

import './dashboard.css'

import {useState} from 'react'
import {Link} from 'react-router-dom'

import {Switch,Router, BrowserRouter,Route} from 'react-router-dom';

import WishList from '../../ProductManager/wishlist/wishlist';
import Orders from '../../ProductManager/orders/orders';
import ProductList from '../../../components/ProductManager/productList/productList';
import AddProduct from '../../../components/ProductManager/addProduct/addProduct'
import Home from '../../../components/Admin/home/home';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export default function PM_Dashboard() {

// handle the state of the sidebar slider
const [sidebarCollapsed , setSidebarCollapsed] = useState(false);
// handle the state of the body components
  const [compCounter , setCompCounter] = useState("0");
    const handlerSidebarCollapse = () =>{
          setSidebarCollapsed(!sidebarCollapsed);
      }
 

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
      collapsible collapsed={sidebarCollapsed} 
      onCollapse={handlerSidebarCollapse} width='220' >
      
        <div className="pm_dash_logo" > 
          <h1>LOGO</h1> 
        </div>
        <Menu theme="dark" 
          defaultSelectedKeys={['sub_dashboard']}     
          mode="inline">
         
          <Menu.Item key="sub_dashboard" 
              onClick={()=> setCompCounter("0")}                           
              icon={<UserOutlined />}>           
                Dashboard           
          </Menu.Item>
          <SubMenu 
            key="sub_products" 
            icon={<ShopOutlinedIcon />} 
            title="Products">
            <Menu.Item key="menu_product_list" 
              onClick={()=>setCompCounter("2")} 
              icon={<ListAltOutlinedIcon/>}>
                Product List
            </Menu.Item>      
            <SubMenu key="sub_product_manager"  
              icon={<TuneOutlinedIcon/>} 
              title="Product Manager">
                <Menu.Item key="menu_add_products"  
                  onClick={()=>setCompCounter("3")}  
                  icon={<AddCircleOutlineOutlinedIcon/>} >
                    Add Products
                </Menu.Item>               
            </SubMenu>  
          </SubMenu>

          <Menu.Item key="menu_wishlist" 
            icon={<PieChartOutlined />}>
              WishList
          </Menu.Item>
          <Menu.Item key="menu_advertisment" 
            icon={<PieChartOutlined />}>
              Advertisment
          </Menu.Item>
          <Menu.Item key="menu_updates" 
            icon={<PieChartOutlined />}>
              Updates
          </Menu.Item>
          <SubMenu key="sub_orders" 
          icon={<TeamOutlined />} 
          title="Orders">
            <Menu.Item key="mennu_order_list" 
              onClick={()=>setCompCounter("4")} >
              Order List
            </Menu.Item>
            <Menu.Item key="menu_order_details">
              Order Details
            </Menu.Item>
          </SubMenu>
       
      </Menu>
    </Sider>

      <Layout className="site-layout">
      <Header className='pm_dash_header' />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              {compCounter === "0" ? "Dashbord" :
               compCounter === "1" ? "Profile" : 
               compCounter === "2"? "Product List" : 
               compCounter === "3" ? "Add Product" : 
               compCounter === "4"? "Others" : "" }
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" 
            style={{ padding: 0, minHeight: 360 }}>
              {compCounter === "0" ? <Home /> : 
               compCounter === "1" ? <WishList />:
               compCounter === "2" ? <ProductList/>:
               compCounter === "3" ? <AddProduct/>:
               compCounter === "4" ? <Orders/> : "others"
              }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>

        </Footer>
      </Layout>
    </Layout>
  )
}
