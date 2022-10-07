import React, { useState, useEffect, } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { register } from '../../actions/userAction'
import FormContainer from '../FormContainer'

function RegisterScreen() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [message, setmessage] = useState('')


    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== ConfirmPassword) {
            setmessage('Pasword does not match')
        } else {
            dispatch(register(name, email, password))
        }

    }

    return (
        <FormContainer>
            {error && <Message variant={'danger'}>{error}</Message>}
            {message && <Message variant={'danger'}>{message}</Message>}
            {loading && <Loader />}
            <h1 className='my-4'>Register</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name'
                        placeholder='enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group className='mt-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email'
                        placeholder='enter email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password'
                        placeholder='enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password'
                        placeholder='enter password'
                        value={ConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Sign Up
                </Button>
            </Form>
            <Row>
                <Col>
                    Have an Account ? <Link to={redirect ? `/login?redirect=${ redirect }` : '/login'}>
                        Sign In
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )

}

export default RegisterScreen