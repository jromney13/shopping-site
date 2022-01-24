import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { projectFirestore } from '../../firebase/config';

//styles
import styles from './ItemDetails.css'
import CardHeader from 'react-bootstrap/esm/CardHeader';

export default function ItemDetails() {

    const {id} = useParams();
    const [card, setCard] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsPending(true)

        const unsub = projectFirestore.collection('items').doc(id).onSnapshot((doc) => {
            if(doc.exists){
                setIsPending(false)
                setCard(doc.data())
            }
            else{
                setIsPending(false)
                setError('Can not find item')
            }

            return () => unsub()
        })
    }, [id])


    return (
        <div>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {card && <p>{card.title}</p>}
        </div>
    )
}
