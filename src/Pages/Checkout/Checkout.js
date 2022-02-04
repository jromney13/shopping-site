import React from 'react';
import { Form, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { useCartContext } from '../../Hooks/useCartContext'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'
import axios from 'axios';

import styles from './Checkout.css'

const stripePromise = loadStripe('pk_test_51KKpPTLWOulgqX8ViMCT7x39kvTR9voYgVubI0ar4RaVxWn4iBAgRH4ozEYIMqHMLOofpI3EmCWFZri7d5tqHUOr00Wkz9vXj8');

export default function Checkout() {

    const { total } = useCartContext()

  return (
  <div>
      <h2>Checkout</h2>
    
        <Elements stripe={stripePromise}>
                <CheckoutForm />
        </Elements>

  </div>
  )
}
