import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { projectFirestore } from '../../firebase/config';
import { Button } from 'react-bootstrap'
import { useCartContext } from '../../Hooks/useCartContext'

//styles
import styles from './ItemDetails.css'

export default function ItemDetails() {

    const {id} = useParams();
    const [card, setCard] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const [error, setError] = useState(false)
    const { cart, dispatch } = useCartContext()
    let { itemCount } = useCartContext()

    useEffect(() => {
        setIsPending(true)

        const unsub = projectFirestore.collection('items').doc(id).onSnapshot((doc) => {
            if(doc.exists){
                setIsPending(false)
                setCard(doc.data())
            }
            else{
                setIsPending(false)
                setError('Can not find item')
            }

            return () => unsub()
        })
    }, [id])

    const handleButtonClick = (e) => {
        let found = false

        // prevents navigation to itemDetails page
        e.stopPropagation();

        // adds item to cart and updates state using CartContext

        // if item is already in cart, increase quantity by one
        cart.map((item) => {
            if(item[0].id === card.id){
                found = true
                item[1] += 1
                dispatch({type: 'UPDATE_CART', payload: cart})
            }
        })

        // if item is not in cart. Add to cart
        if(!found){
            cart.push([card, 1])
            dispatch({type: 'UPDATE_CART', payload: cart})
        }

        itemCount += 1
        dispatch({type: 'UPDATE_ITEMS', payload: itemCount})
    }


    return (
        <div className='item-details-container'>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {card && 
                <div className='item-details'>
                    <h2 className='item-title'>{card.title}</h2>
                    <img className="item-image" src={card.picURL} />
                    <p>{card.desc}</p>
                    <p className='item-price'>${card.price}</p>
                    <Button onClick={handleButtonClick} variant="primary">Add to Cart</Button>
                </div>
            }
        </div>
    )
}
