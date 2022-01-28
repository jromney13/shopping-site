import { useNavigate } from "react-router-dom"

export default function Home() {
    
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/receipt')
    }
    
    return (
        <div>
            <button onClick={handleClick}>X</button>
        </div>
    )
}
