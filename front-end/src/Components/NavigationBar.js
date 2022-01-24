import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './NavigationBar.css'
import ShoppingBag from '../Assets/shopping-bag.svg'
import { useAuthContext } from '../Hooks/useAuthContext'

export default function NavigationBar() {

    const { user } = useAuthContext()

    return (
        <div className='nav-div'>
            <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Classy Couture</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
                    {user && <Nav.Link as={Link} to="/itemform">Add Item</Nav.Link>}
                </Nav>
                <Nav className="cart-icon">
                    <Nav.Link className='cart-icon' as={Link} to="/cart">
                        <img
                            alt=""
                            src={ShoppingBag}
                            width="30"
                            height="30"
                        />{' '}
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    )
}
