import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollection } from '../../Hooks/useCollection'
import { useLocation } from 'react-router-dom';
import { projectFirestore } from "../../firebase/config"

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

  <div>
    <h2>Order Receipt</h2>
    {!documents && <p>Whoops! Order cannot be found.</p>}
    {documents && documents.length != 0 && 
    <div className='receipt-container'>
      <div className='receipt'>

        <h4>Order Number: {documents[0].id}</h4>

        <div>{documents[0].firstName} {documents[0].lastName}</div>
        <div>{documents[0].address}</div>
        <div>{documents[0].city}, {documents[0].state} {documents[0].zip}</div>

        <div className='order-summary'>
          <h4>Order Summary</h4>
        </div>

        {items && 
        <div>
          {items.map((item) => (
            <div key={item.id}>{item.title} {item.quantity}</div>
          ))}
        </div>}

      </div> 
     </div>}
  </div>);
}
