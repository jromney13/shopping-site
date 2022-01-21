import { Button, Table } from 'react-bootstrap'
import { useCartContext } from '../../Hooks/useCartContext'
import { useEffect, useState } from 'react'

import styles from './Cart.css'


export default function Cart() {

    let { cart } = useCartContext()
    const { dispatch } = useCartContext()

    const [total, setTotal] = useState(0.00)
    const [trigger, setTrigger] = useState(null)

    const handleDelete = (item) => {
        // find all items that match item id
        cart = cart.filter(i => i[0].id !== item[0].id )
        // update CartContext cart state
        dispatch({type: 'UPDATE_CART', payload: cart})
    }

    const handleIncrease = (item) => {
        cart.map((cartItem) => {
            if(cartItem[0].id === item[0].id){
                cartItem[1] += 1
                dispatch({type: 'UPDATE_CART', payload: cart})
            }
        })
        setTrigger(Math.random())
    }

    const handleDecrease = (item) => {
        cart.map((cartItem) => {
            if(cartItem[0].id === item[0].id){
                // if quantity is at one, remove from cart
                if(cartItem[1] === 1){
                    handleDelete(item)
                }
                // if not, decrease quantity by one
                else{
                    cartItem[1] -= 1
                    dispatch({type: 'UPDATE_CART', payload: cart})
                }
            }
        })
        setTrigger(Math.random())
    }

    // TODO: Fix when cart quantity is adjusted
    useEffect(() => {
        var runningTotal = 0.00

        cart.forEach(item => {
            runningTotal += (parseFloat(item[0].price) * parseFloat(item[1]))
        } )
        
        setTotal(runningTotal)

    }, [cart, trigger])

    return (
        <div>
            <div className='table-div'>
                <h2>Cart</h2>
                {!total == 0 && 
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart && cart.map((item) => (
                            <tr key={item[0].id}>
                                <td>{item[0].title}</td>
                                <td>{item[0].price}</td>
                                <td className='quantity'>
                                    {item[1]}   
                                </td>
                                <td className='button-col'>
                                    <Button onClick={() => handleDelete(item)} className='delete-button'>x</Button>
                                    <Button onClick={() => handleIncrease(item)} className='add-button'>+</Button>
                                    <Button onClick={() => handleDecrease(item)} className='sub-button'>-</Button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={4}>
                                Total: ${(Math.round(total * 100) / 100).toFixed(2)}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                }
                {total == 0 && 
                <p>Nothing in your cart!</p>
                }   
            </div>
        </div>
    )
}
