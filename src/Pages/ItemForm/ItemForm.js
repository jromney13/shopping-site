import { useState } from "react"
import { Form, Button, Row, Col, FormControl, InputGroup } from 'react-bootstrap'
import { projectStorage } from "../../firebase/config"

import styles from './ItemForm.css'

export default function ItemForm() {

    const [desc, setDesc] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [picURL, setPicURL] = useState('')
    const [pic, setPic] = useState('')
    const [inventory, setInventory] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await onFileSubmit()

        console.log(desc, title, price, picURL, inventory)
        // TODO: Add item entry to firebase
    }

    const onFileSubmit = async () => {
        if(pic == null)
            return;

        // add file to firebase storage
        const imageRef = projectStorage.ref(`/${pic.name}`)
        await imageRef.put(pic)

        // get the url for the image and update state
        setPicURL(await imageRef.getDownloadURL().toString())

        console.log(picURL)

    }

    return (
        <div className="item-form">
            <Form onSubmit={handleSubmit} className="input-form">
                <h2 className="form-title">Add an Item</h2>
                <Form.Group as={Row} className="mb-3" controlId="formItemTitle">
                    <Form.Label column sm={2}>Item Title</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                         />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formItemDesc">
                    <Form.Label column sm={2}>Item Description</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            as="textarea"
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formItemPrice">
                    <Form.Label column sm={2}>Item Price</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            type="number" 
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formItemQuantity">
                    <Form.Label column sm={2}>Item Quantity</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            type="number" 
                            onChange={(e) => setInventory(e.target.value)}
                            value={inventory}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formItemPhoto">
                    <Form.Label column sm={2}>Item Photo</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            type="file"
                            onChange={(e)=> setPic(e.target.files[0])}
                        />
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
