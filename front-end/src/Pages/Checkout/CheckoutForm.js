import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { Form, Button } from 'react-bootstrap'
import { useCartContext } from '../../Hooks/useCartContext'
import { useState } from 'react';

import styles from './CheckoutForm.css'

export default function CheckoutForm() {

    const { total } = useCartContext()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [addressState, setAddressState] = useState('')
    const [zip, setZip] = useState('')
    
    const elements = useElements();
    const stripe = useStripe();

    const handleClick = async (e) => {
        console.log('Payment Triggered')

        e.preventDefault()
        if(!stripe || !elements) {
            return;
        }

        const { data: clientSecret } = await axios.post("/create-payment-intent", {
            amount: parseFloat(total) * 100
        })
        
        const { paymentIntent } = await stripe.confirmCardPayment(
            clientSecret.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            }
        )
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

            </Form>
        </div>
    )
}