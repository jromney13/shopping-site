import axios from 'axios'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Form, Button, Modal } from 'react-bootstrap'
import { useCartContext } from '../../Hooks/useCartContext'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectFirestore, timestamp } from '../../firebase/config'


import styles from './CheckoutForm.css'

export default function CheckoutForm() {

    let { cart, total } = useCartContext()
    const { dispatch } = useCartContext()
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [addressState, setAddressState] = useState('')
    const [zip, setZip] = useState('')
    const [paymentError, setPaymentError] = useState(null)
    const [show, setShow] = useState(false);
    
    const elements = useElements();
    const stripe = useStripe();

    const handleClose = () => {
        setShow(false)
        setPaymentError(null)
    };

    const handleShow = () => setShow(true);

    const handleClick = async (e) => {
       await authorizePayment(e)


    }

    const authorizePayment = async (e) => {

        console.log('Payment Triggered')

        e.preventDefault()
        if(!stripe || !elements) {
            return;
        }

        const { data: clientSecret } = await axios.post("/create-payment-intent", {
            amount: parseFloat(total) * 100
        })
        
        const result = await stripe.confirmCardPayment(
            clientSecret.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        address: {
                          city: city,
                          country: "US",
                          line1: address,
                          line2: null,
                          postal_code: zip,
                          state: addressState
                        },
                        email: email,
                        name: (firstName + " " + lastName),
                        phone: null
                      }
                }
            }
        )

        if(result.error){
            setPaymentError(result.error)
            handleShow()
        }
        else{
            createOrderReceipt(result.paymentIntent.id)
        }
    }

    const createOrderReceipt = async (paymentId) => {
        const items = []
        const quantities = []

        cart.map((item) => {
            items.push(projectFirestore.collection('items').doc(item[0].id))
            quantities.push(item[1])
        })


        const createdAt = timestamp.fromDate(new Date())
        const doc = { firstName, lastName, email, address, city, addressState, zip, items, quantities, paymentId, createdAt}

        try{
           await projectFirestore.collection('orders').add(doc)
        }
        catch(err){
            console.log(err.message)
        }

        cart = []
        dispatch({type: 'UPDATE_CART', payload: cart})
        total = 0.00
        dispatch({type: 'UPDATE_TOTAL', payload: total})
        
        navigate('/receipt', {state: paymentId})
    
    }

    return (
        <div>
            <Form className="checkout-form" onSubmit={handleClick}>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter first name" 
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter last name" 
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} 
                        required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Address" 
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter City" 
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter State"
                        onChange={(e) => setAddressState(e.target.value)}
                        value={addressState} 
                        required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Zip" 
                        onChange={(e) => setZip(e.target.value)}
                        value={zip}
                        required/>
                </Form.Group>

                <div className='card-element-container'>
                    <CardElement id='card-element' />
                </div>

                <div className='total'>Order Total: ${total} </div>
        
                <Button variant="primary" type="submit">Place Order</Button>

                {paymentError && 
                        <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Issue Processing Payment! </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Please check your card information and try again.</Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                }

            </Form>
        </div>
    )
}