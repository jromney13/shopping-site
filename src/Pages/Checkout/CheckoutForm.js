import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { Button } from 'react-bootstrap';


export default function CheckoutForm() {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
          }

        const cardElement = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement
        })

        if(error){
            console.log(error)
        }
        else{
            console.log(paymentMethod)
        }

        // const result = await stripe.confirmCardPayment({
        //     //`Elements` instance that was used to create the Payment Element
        //     elements,
        //     confirmParams: {
        //       return_url: "/",
        //     },
        //   });
      
        //   if (result.error) {
        //     // Show error to your customer (for example, payment details incomplete)
        //     console.log(result.error.message);
        //   } else {
        //     // Your customer will be redirected to your `return_url`. For some payment
        //     // methods like iDEAL, your customer will be redirected to an intermediate
        //     // site first to authorize the payment, then redirected to the `return_url`.
        //   }
    }
  
    return (
    <div>
        <form onSubmit={handleSubmit}>
            <CardElement/>
            <Button type='submit'>Pay Now</Button>
        </form>
    </div>
    );
}
