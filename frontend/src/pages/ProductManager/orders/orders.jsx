import React, {useEffect} from 'react'
import './orders.css'

import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../redux/actions/orderActions';

import UserTableRow from '../../../components/ProductManager/orderRow/orderRow'

export default function Orders() {
  const dispatch = useDispatch();

 	useEffect(() => {
 	  dispatch(getOrders());
 	}, [dispatch]);

  const orders = useSelector((state) => state.getOrder.orders);
  console.log(orders);

  return (
    <>
      <main>
        <div className="table-container">
          <div className="uk-overflow-auto">
            <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
              <thead>
                <tr>
                  <th className="uk-table-shrink" />
                  <th className="uk-table-shrink" />
                  <th>Id</th>
                  <th>Fullname</th>
                  <th>LastName</th>
                  <th>email</th>
                  <th>total</th>
                </tr>
              </thead>
              <tbody>


                {
              !orders.length ? <div>empty</div> : (
                orders.map((val, key) => {
                  console.log(val);
                  return (
                    <div className='productListItems' >
                      <th className="uk-table-shrink" />
                      <th className="uk-table-shrink" />
                      <th>{val.orderId} </th>
                      <th>{val.userFirstName}</th>
                      <th>{val.userLastName}</th>
                      <th>{val.userEmail} </th>
                      <th>{val.total}</th>
                    </div> 
                  )
                }) 
              )
            }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
    
  )
}
