import { Card, Button } from 'react-bootstrap'
import Logo from '../Assets/shopping-bag.svg'

import styles from './ItemCard.css'

export default function ItemCard({cardData}) {
    return (
        <div className='itemCard'>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={Logo} />
                <Card.Body>
                    <Card.Title>{cardData.title}</Card.Title>
                    <Card.Text>
                        ${cardData.price}
                    </Card.Text>
                    <Button variant="primary">Add to Cart</Button>
                </Card.Body>
            </Card>
        </div>
    )
}
