import React from 'react'
import './usersList.css'

import { Table , Switch , message,Button} from 'antd';

import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts ,deleteProductById ,editProduct } from '../../../redux/actions/productActions';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';


import { Drawer, Form, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import axios from 'axios';



const { Option } = Select;








export default function UsersList() {



    const dispatch = useDispatch();

    const [users ,setUsers] = useState([]);
    // const [searchInput , setSearchInput] = useState('');

    useEffect(()=>{
      const fetchProducts = async ()=>{
        const res = await axios.post('http://localhost:5000/api/getAllUsers');
        console.log(res.data);
        setUsers(res.data);
      }

      fetchProducts()
    }, [])


   





    // rowSelection objects indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    
        },
        onSelect: (record, selected, selectedRows ) => {
        console.log(record, selected, selectedRows);
      
        console.log( selectedRows[0].id);
        
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
        },
        getCheckboxProps: (record)=>{
          //console.log(record)  
        }  ,
        selections: true,
        hideSelectAll: true,
  };




      
   
 
  const [fixedTop, setFixedTop] = React.useState(false);

 

   //handle delete
//    const DeleteProduct = (record) =>{
//     console.log(record.id)    

//     if(record.statusValue === 0){
//       message.error("Product Already Deleted")
//     }
//     else{
//       if(window.confirm("Are you sure you want to delete?")){
//         dispatch(deleteProductById(record.id));
//         setVisible(false);
//         message.success("Deleted Successfully");
//         // dispatch(getAllProducts());
       
//     }
      
//     }
  

//   }

  //state for sidedrawer edit

  const [visible , setVisible] = useState(false)
  //state = { visible: false };

  const showDrawer = () => {
    setVisible(!visible);
  };

  const onClose = () => {
    setVisible(false);
  }

//   const [editValues ,setEditValues] = useState({
//     id:'',
//     category:'',
//     detail: '',
//     image: '',
//     name: '',
//     brand: '',
//     price: '',
//     status:'',
//     count_in_stock: '',
//   })
  // state for product list search bar

 

//   const EditProduct = (record) =>{
   
//     setEditValues({ ...editValues,
//       id: record.id,
//       category: record.category,
//       image: record.image,
//       detail: record.detail,
//       name: record.name,
//       brand: record.brand,
//       price: record.price,
//       count_in_stock: record.count_in_stock,
//       status: record.statusValue 
//     })

//   }


  const [sortedInfo ,setSortedInfo] = useState()
 
  const handleChange = (pagination, filters, sorter) =>{
    console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter)
  }


    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          fixed: 'left',
          width: 30
        },
        {
          title: 'First Name',
          dataIndex: 'fname',
          key: 'fname',
          width:100,  
          sorter: (a, b) => a.fname - b.fname     
       
         
        },
  
        {
            title: 'Last Name',
            dataIndex: 'lname',
            key: 'lname',
            width:100,
            sorter: (a, b) => a.lname - b.lname
            
           
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
            width:80,
            sorter: (a, b) => a.contact - b.contact

        },
        {
          title: 'SignUp Date',
          dataIndex:'SU_date',
          key: 'SU_date',
          width:120
        },   
        {
            title:'Status',
            dataIndex: 'status',
            key: "status",
            width:60,
            
        },
        // {
        //   title: "Action",
        //   key: "deleteAndEdit",
        //   width: 70,
          
        //   render: (record) => {
        //     return(
        //       <>
        //       <EditOutlinedIcon  onClick={()=> { 
        //         showDrawer()  
        //         EditProduct(record)} 
        //       }
        //         style={{color: "gray" , fontWeight: "bolder", cursor: "pointer" }}  />
        //       <DeleteOutlineOutlinedIcon onClick={() =>{
        //         DeleteProduct(record)
        //       }}  style={{color: "red" , fontWeight: "bolder", cursor: "pointer" , marginLeft:10}}  />

        //       </>
        //     );
        //   },
        // },
        

      ];
    
    const data = [];     

   
      if(!users.length){
          return <div>Empty</div>
      }
      else{      

          users.map((val,key)=>{
            data.push({
                key: val.id,
                id: val.id,
                fname: val.fname,
                lname: val.lname,
                contact: val.email === null ? val.phone_number : val.email,
                SU_date: val.signUpDate,
                status:  val.status === "active"? <p className='active_status'>{val.status}</p> : <p className="de-active_status">{val.status}</p>  
            })
          })
          
      };


     

    
    
  return (
    <div className="productListPageHolder">
    {/* <div className="searchBarContainer">
       <div className="productList_searchBarWrapper">
            <input type="text" 
                   className='productList_searchBar' 
                   placeholder='Search Product'
                   onChange={e=>setSearchInput(e.target.value)}
                   />
            
       </div>
    </div> */}

    <Table 
    rowSelection={{ ...rowSelection }}
    columns={columns}
    dataSource={data}
    scroll={{ x: 1000 }}
    onChange={handleChange}
    summary={pageData => (
          <Table.Summary fixed={fixedTop ? 'top' : 'bottom'}>
            <Table.Summary.Row >
          
              <Table.Summary.Cell   index={2} colSpan={8}>
                
              </Table.Summary.Cell>
              <Table.Summary.Cell index={10}></Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
    )}
    sticky
    />

</div>
  )
}
