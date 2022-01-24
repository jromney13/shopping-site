import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import CheckoutForm from '../Checkout/CheckoutForm';

const stripePromise = loadStripe('pk_test_51KKpPTLWOulgqX8ViMCT7x39kvTR9voYgVubI0ar4RaVxWn4iBAgRH4ozEYIMqHMLOofpI3EmCWFZri7d5tqHUOr00Wkz9vXj8');


export default function Home() {
    
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    )
}
