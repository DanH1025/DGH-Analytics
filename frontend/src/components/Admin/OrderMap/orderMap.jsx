import React , {useState} from 'react';

import './orderMap.css'
import ReactMapGL , {Marker, Popup} from 'react-map-gl';
import {  useSelector } from 'react-redux';

import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';

export default function OrderMap(){

    
    const Order = useSelector(state => state.getOrder);
    const {orders} = Order;
    console.log(orders.length + "this is teh number of orders there is")

    const [viewPort , setViewPort] = useState({
        latitude:9.022875,
        longitude: 38.752261,
        zoom:9,
        width: '100vw',
        height: '100vh'
      })

      const [marker,setMarker] = useState({
        latitude: "",
        longitude: ""
      })
      const [selectedOrder , setSelectedOrder]= useState(null)
  
    return(
        <>
        <div className='mapOrderTitle'>
            <h3>Pending Orders</h3>
        </div>
        <div className="order_map_container">
            <ReactMapGL {...viewPort} 
                    mapboxAccessToken= "pk.eyJ1IjoiZGFuaGdiIiwiYSI6ImNsMXVnNDIxbzAwMmYzcXBiMXB0ZWVjcWMifQ.nC63RhWneFhiZ4k4XJim9A"
                    onMove={(viewPort)=> { setViewPort(viewPort)}}
                    mapStyle="mapbox://styles/mapbox/streets-v11">
                        {orders.map(order => order.status === 'inProgress' ?  (

                            <Marker 
                              key={order.orderId}
                              latitude={order.latitude}
                              longitude={order.longitude} 
                              
                              >                           
                    
                                <PersonPinCircleIcon style={{fontSize: '35', color: 'blue'}}
                                    className='orderLocationIcon'
                                    onClick={()=>{
                                        console.log(selectedOrder);
                                        setSelectedOrder(order)}                               
                                    }
                                />                            
                            
                            </Marker>
                            

                            
                        ): <></>
                        
                        )                      
                        }

                   

                        {selectedOrder ? (
                            <Popup latitude={selectedOrder.latitude} longitude={selectedOrder.longitude}>
                                <div>{selectedOrder.contact}</div>
                            </Popup>
                            
                        ):null}
                   
                
            </ReactMapGL> 

        </div>

        
        
        </>
    )

}
