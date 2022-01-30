import { Card, Button } from 'react-bootstrap'
import Logo from '../Assets/shopping-bag.svg'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../Hooks/useCartContext'

import styles from './ItemCard.css'

export default function ItemCard({cardData}) {

    const { cart, dispatch } = useCartContext()
    let { itemCount } = useCartContext()
    const navigate = useNavigate()

    const handleCardClick = () => {
        const path = `/itemDetails/${cardData.id}`
        navigate(path)
    }

    const handleButtonClick = (e) => {
        let found = false

        // prevents navigation to itemDetails page
        e.stopPropagation();

        // adds item to cart and updates state using CartContext

        // if item is already in cart, increase quantity by one
        cart.map((item) => {
            if(item[0].id === cardData.id){
                found = true
                item[1] += 1
                dispatch({type: 'UPDATE_CART', payload: cart})
            }
        })

        // if item is not in cart. Add to cart
        if(!found){
            cart.push([cardData, 1])
            dispatch({type: 'UPDATE_CART', payload: cart})
        }

        itemCount += 1
        dispatch({type: 'UPDATE_ITEMS', payload: itemCount})
    }


    return (
        <div className='itemCard'>
            <Card onClick={handleCardClick} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={cardData.picURL} />
                <Card.Body>
                    <Card.Title>{cardData.title}</Card.Title>
                    <Card.Text>
                        ${cardData.price}
                    </Card.Text>
                    <Button onClick={handleButtonClick} variant="primary">Add to Cart</Button>
                </Card.Body>
            </Card>
        </div>
    )
}
