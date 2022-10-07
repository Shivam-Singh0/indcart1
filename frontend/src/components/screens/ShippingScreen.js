import React, { useState, useEffect, } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../FormContainer'
import { saveShippingAdd } from '../../actions/cartAction'
import CheckSteps from '../CheckSteps'

function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const { shipping_add } = cart


    const [add, setAdd] = useState(shipping_add.add)
    const [city, setCity] = useState(shipping_add.city)
    const [postal, setPostal] = useState(shipping_add.postal)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAdd({ add, city, postal, }))
        navigate('/payment')

    }
    return (

        <FormContainer>
            <CheckSteps step1 step2 />
            <Card className='rounded my-4'>
                <Card.Header>Shipping</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type='text'
                                placeholder='enter Address'
                                value={add ? add : ''}
                                onChange={(e) => setAdd(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>City</Form.Label>
                            <Form.Control type='text'
                                placeholder='enter city'
                                value={city ? city : ''}
                                onChange={(e) => setCity(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Pin Code</Form.Label>
                            <Form.Control type='text'
                                placeholder='enter Pin code'
                                value={postal ? postal : ''}
                                onChange={(e) => setPostal(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Button className='mt-3' type='submit' variant='primary'>
                            Continue
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </FormContainer>
    )
}

export default ShippingScreen