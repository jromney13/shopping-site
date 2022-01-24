import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'

export default function CheckoutForm() {
    
    const elements = useElements();
    const stripe = useStripe();

    const handleClick = async (e) => {
        e.preventDefault()
        if(!stripe || !elements) {
            return;
        }

        const { data: clientSecret } = await axios.post("/create-payment-intent", {
            amount: 3999
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
            <h1>Card</h1>
            <form id='payment-form' onSubmit={handleClick}>
                <label htmlFor="card-element">Card</label>
                <CardElement id='card-element' />
                <button>Pay</button>
            </form>
        </div>
    )
}