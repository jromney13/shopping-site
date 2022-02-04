import { Button, Table } from 'react-bootstrap'
import { useCartContext } from '../../Hooks/useCartContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Cart.css'


export default function Cart() {

    let { cart, itemCount } = useCartContext()
    const { dispatch } = useCartContext()
    const navigate = useNavigate()

    const [total, setTotal] = useState(0.00)
    const [trigger, setTrigger] = useState(null)

    const handleDelete = (item) => {
        // find all items that match item id
        cart = cart.filter(i => i[0].id !== item[0].id )
        // update CartContext cart state
        dispatch({type: 'UPDATE_CART', payload: cart})

        let cartItemCount = 0

        // finds out how many items we have in the cart after deletion
        cart.forEach(element => {
            cartItemCount += element[1]
        });
        // updates cart item counter in navbar
        dispatch({type: 'UPDATE_ITEMS', payload: cartItemCount})

    }

    const handleIncrease = (item) => {
        cart.map((cartItem) => {
            if(cartItem[0].id === item[0].id){
                cartItem[1] += 1
                dispatch({type: 'UPDATE_CART', payload: cart})
            }
        })

        // Adjusts cart nav bar counter
        itemCount +=1
        dispatch({type: 'UPDATE_ITEMS', payload: itemCount})

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

        // Adjusts cart nav bar counter
        itemCount -= 1
        dispatch({type: 'UPDATE_ITEMS', payload: itemCount})

        setTrigger(Math.random())
    }

    const handleCheckout = () => {
        navigate('/checkout')
    }

    useEffect(() => {
        var runningTotal = 0.00

        cart.forEach(item => {
            runningTotal += (parseFloat(item[0].price) * parseFloat(item[1]))
        } )
        
        setTotal(runningTotal)
        dispatch({type: 'UPDATE_TOTAL', payload: runningTotal})

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
                            <tr className='item-row' key={item[0].id}>
                                <td>{item[0].title}</td>
                                <td>${item[0].price}</td>
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
                {total != 0 && <Button onClick={handleCheckout} className="checkout-btn">Checkout</Button> }   
            </div>
        </div>
    )
}
