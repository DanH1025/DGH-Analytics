import React, {useEffect} from 'react'
import './orders.css'

import { Table } from "react-bootstrap";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// To make rows collapsible
import "bootstrap/js/src/collapse.js";

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
        <div>
          <div>
            <Table striped bordered hover>
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
                        <>
                        <tr data-toggle="collapse"
                            data-target=".multi-collapse1"
                            aria-controls="multiCollapseExample1">
                          <th className="uk-table-shrink" />
                          <th className="uk-table-shrink" />
                          <th>{val.orderId} </th>
                          <th>{val.userFirstName}</th>
                          <th>{val.userLastName}</th>
                          <th>{val.userEmail} </th>
                          <th>{val.total}</th>
                        </tr>
                        <tr class="collapse multi-collapse1" id="multiCollapseExample1">
                          <td>Child col 1</td>
                          <td>Child col 1</td>
                          <td>Child col 1</td>
                          <td>Child col 1</td>
                          <td>Child col 1</td>
                          <td>Child col 1</td>
                          <td>Child col 1</td>
                          <td>Child col 1</td>
                        </tr>
                        </>
                      )
                    }) 
                  )
                }
              </tbody>
            </Table>
          </div>
        </div>
      </main>
    </>
    
  )
}
