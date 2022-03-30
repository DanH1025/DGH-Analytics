import React from 'react'

import './dashboard.css'

import {useState} from 'react'
import {Link} from 'react-router-dom'

import {Switch,Router, BrowserRouter,Route} from 'react-router-dom';

import WishList from '../wishlist/wishlist';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export default function PM_Dashboard() {

// handle the state of the sidebar slider
  const [sidebarCollapsed , setSidebarCollapsed] = useState(false);
// handle the state of the body components
  const [compCounter , setCompCounter] = useState("");
    const handlerSidebarCollapse = () =>{
          setSidebarCollapsed(!sidebarCollapsed);
      }
  const getComponent = () =>{
      if(compCounter === ""){
        return <h3>Working profile default</h3>
      }
      if(compCounter === "1"){
        return <WishList/>
      }
  }


  return (
    <Layout style={{ minHeight: '100vh' }}>
     <Sider collapsible collapsed={sidebarCollapsed} onCollapse={handlerSidebarCollapse}>
      
       <div className="pm_dash_logo" > <h1>LOGO</h1> </div>
       <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
         
         <Menu.Item key="1" onClick={()=>setCompCounter("1")} icon={<PieChartOutlined />}>           
                 Profile            
         </Menu.Item>
         <SubMenu key="sub1" icon={<UserOutlined />} title="Products">
           <Menu.Item key="2">Product List</Menu.Item>
           <Menu.Item key="3">Product Details</Menu.Item>
         </SubMenu>
         <Menu.Item key="4" icon={<PieChartOutlined />}>
           WishList
         </Menu.Item>
         <Menu.Item key="5" icon={<PieChartOutlined />}>
           Advertisement
         </Menu.Item>
         <Menu.Item key="6" icon={<PieChartOutlined />}>
           Updates
         </Menu.Item>
         <SubMenu key="sub2" icon={<TeamOutlined />} title="Orders">
           <Menu.Item key="7">Order List</Menu.Item>
           <Menu.Item key="8">Order Details</Menu.Item>
         </SubMenu>
       
       </Menu>
     </Sider>
     <Layout className="site-layout">
       <Header className='pm_dash_header' />
       <Content style={{ margin: '0 16px' }}>
         <Breadcrumb style={{ margin: '16px 0' }}>
           <Breadcrumb.Item>Profile</Breadcrumb.Item>
           <Breadcrumb.Item></Breadcrumb.Item>
         </Breadcrumb>
         <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

                 {getComponent()}
        
         </div>
       </Content>
       <Footer style={{ textAlign: 'center' }}></Footer>
     </Layout>
   </Layout>
  )
}
