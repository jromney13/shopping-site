import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { projectFirestore } from "../../firebase/config"

import styles from './Orders.css'

export default function Orders() {

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
  
    useEffect( () => {
    
        let ref = projectFirestore.collection('orders')
    
          const unsub = ref.onSnapshot((snapshot) => {
              let results = []
              snapshot.docs.forEach(doc => {
                  results.push({...doc.data(), id: doc.id})
              })
              
              setDocuments(results)
    
          }, (error) => setError("Could not fetch data") )
    
          return () => unsub()
    
      }, [])

      console.log(documents)
  
    return  (
        <div className='order-container'>
        {/* {!documents && <p>Whoops! Order cannot be found.</p>} */} 
        <div className='order-body'>
            <h2>Orders</h2>

              <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Order Number</th>
                    <th>Order Name</th>
                    <th>Order Date</th>
                    <th>Fulfilled</th>
                    </tr>
                </thead>
                <tbody>
                    {documents && documents.map((document) => (
                        <tr key={document.id}>
                            <td>{document.id}</td>
                            <td>{document.firstName + ' ' + document.lastName}</td>
                            <td>{new Date( document.createdAt.seconds * 1000 + document.createdAt.nanoseconds / 1000, ).toLocaleDateString()}</td>
                            <td>No</td>

                        </tr>
                    ))}
                    
                </tbody>
            </Table>
         </div>
      </div>);
}
