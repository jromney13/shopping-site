import { Card, Button } from 'react-bootstrap'
import Logo from '../Assets/shopping-bag.svg'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../Hooks/useCartContext'

import styles from './ItemCard.css'

export default function ItemCard({cardData}) {

    const { cart, dispatch } = useCartContext()
    const navigate = useNavigate()

    const handleCardClick = () => {
        const path = `/itemDetails/${cardData.id}`
        navigate(path)
    }

    const handleButtonClick = (e) => {
        // prevents navigation to itemDetails page
        e.stopPropagation();

        cart.push(cardData)
        dispatch({type: 'ADD', payload: cart})

        navigate('/cart')
    }


    return (
        <div className='itemCard'>
            <Card onClick={handleCardClick} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={Logo} />
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
