import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useLogin } from '../../Hooks/useLogin'

import styles from './Login.css'

export default function Login() {

    const { login, error, isPending } = useLogin()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)

    }

  return (
      <div>
      <h2>Admin Login</h2>
        <Form onSubmit={handleSubmit} className='login-form'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} />
            </Form.Group>

            {!isPending && <Button variant="primary" type="submit">
                Submit
            </Button>}
            {isPending && <p>Loading</p>}
            {error && <p>{error}</p>}
        </Form>
    </div>
  )
}
