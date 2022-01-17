import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import ItemCard from '../../Components/ItemCard'
import { useCollection } from '../../Hooks/useCollection'
import { useCartContext } from '../../Hooks/useCartContext'

import styles from './Menu.css'

export default function Menu() {

    const { cart } = useCartContext()
    const { documents, error } = useCollection(
        'items',
        null
    )

    console.log(cart)

    return (
        <div className='menu'>
            <div className="item-container">
                <Container>
                    <Row lg={3}>
                        {documents && documents.map((document) => (
                            <div key={document.id}>
                                {documents && <Col lg={true}><ItemCard cardData={document}/></Col>}
                            </div>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    )
}
