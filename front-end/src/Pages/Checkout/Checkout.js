import React from 'react';
import { Form, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { useCartContext } from '../../Hooks/useCartContext'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'
import axios from 'axios';

import styles from './Checkout.css'

export default function Checkout() {

    const { total } = useCartContext()

  return (
  <div>
      <h2>Checkout</h2>
    <Form className="checkout-form">
        <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Street Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter City" required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="Enter State" required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" required/>
        </Form.Group>

        <div className='total'>Order Total: ${total} </div>

        <Button variant="primary" type="submit">
            Proceed to Payment
        </Button>
    </Form>

  </div>
  )
}
