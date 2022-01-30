import { useNavigate } from "react-router-dom"
import { Card, Button } from 'react-bootstrap'

import Dress from '../../Assets/home-dress.jpg'
import styles from './Home.css'

export default function Home() {
    
    const navigate = useNavigate()

    return (
        <div className="home">
            {Dress && <div className="image-container">
                <img className="dress-home" src={Dress} />
                <div className="overlay">
                    <h3>Welcome to Classy Couture</h3>
                    <h5>Take a look at our selection of elegant dresses that are guaranteed to make you stand out at your next event</h5>
                </div>
            </div>}
        </div>
    )
}
