import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollection } from '../../Hooks/useCollection'
import { useLocation } from 'react-router-dom';
import { projectFirestore } from "../../firebase/config"
import { Table } from 'react-bootstrap'

import styles from './Receipt.css'

export default function Receipt() {

const {state} = useLocation()

const [documents, setDocuments] = useState(null)
const [items, setItems] = useState(null)
const [error, setError] = useState(null)

const first = useRef(true)

  useEffect( () => {

    if(!state){
      return;
    }

    let ref = projectFirestore.collection('orders')

      ref = ref.where('paymentId', '==', state.paymentId)

      const unsub = ref.onSnapshot((snapshot) => {
          let results = []
          snapshot.docs.forEach(doc => {
              results.push({...doc.data(), id: doc.id})
          })

          setDocuments(results)

      }, (error) => setError("Could not fetch data") )

      return () => unsub()

  }, [])

  useEffect(() => {

    if(first.current){
      first.current = false
    }
    else{
      let refer = projectFirestore.collection('orders').doc(documents[0].id).collection('cartItems')
  
      const unsub = refer.onSnapshot((snapshot) => {
          let itemList = []
          snapshot.docs.forEach(doc => {
              itemList.push({...doc.data(), id: doc.id})
          })
  
          setItems(itemList)
  
      }, (error) => setError("Could not fetch data") )
  
      return () => unsub()
    }
}, [documents])

  return (

  <div className='receipt-container'>
    {!documents && <p>Whoops! Order cannot be found.</p>}
    {documents && documents.length != 0 && 
    <div className='receipt-body'>
        <h2>Order Receipt</h2>
        <hr />
      <div className='receipt'>
        <h4>Order Number: {documents[0].id}</h4>
        <br></br>
        <div>{documents[0].firstName} {documents[0].lastName}</div>
        <div>{documents[0].address}</div>
        <div>{documents[0].city}, {documents[0].state} {documents[0].zip}</div>
        <br></br>
        <div className='order-summary'>
          <h4>Order Summary</h4>
          <br />
        </div>
          <Table striped bordered>
            <thead>
                <tr>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {items && items.map((item) => (
                    <tr className='item-row' key={item.id}>
                        <td>{item.title}</td>
                        <td>${item.price}</td>
                        <td className='quantity'>
                            {item.quantity}   
                        </td>
                    </tr>
                ))}
                <tr>
                    <td className='total-row' colSpan={4}>
                        Total: ${documents[0].total}
                    </td>
                </tr>
            </tbody>
        </Table>
        <p className='ending-message'>Thanks for shopping at Classy Couture!</p>
      </div> 
     </div>}
  </div>);
}
