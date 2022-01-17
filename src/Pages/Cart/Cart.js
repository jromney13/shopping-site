import { Button, Table } from 'react-bootstrap'
import { useCartContext } from '../../Hooks/useCartContext'

import styles from './Cart.css'


export default function Cart() {

    let { cart } = useCartContext()
    const { dispatch } = useCartContext()

    const handleDelete = (item) => {
        // find all items that match item id
        cart = cart.filter(i => i.id !== item.id )
        // update CartContext cart state
        dispatch({type: 'UPDATE_CART', payload: cart})

        console.log(cart)

    }

    return (
        <div>
            <div className='table-div'>
                <h2>Cart</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart && cart.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td>
                                    1   
                                    <Button onClick={() => handleDelete(item)} className='delete-button'>x</Button>
                                    <Button className='add-button'>+</Button>
                                    <Button className='sub-button'>-</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
