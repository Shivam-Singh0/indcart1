import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckSteps from '../CheckSteps'
import FormContainer from '../FormContainer'
import { savePaymentMethod } from '../../actions/cartAction'

function PaymentScreen() {
    const cart = useSelector(state => state.cart)
    const { shipping_add } = cart
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shipping_add.add) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as={'legend'}>Select Method</Form.Label>
                    <Col className='mx-4 my-4'>
                        <Form.Check type="radio" label="Paypal or Credit Card"
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)} />
                    </Col>
                </Form.Group>

                <Button type='submit' className='rounded' variant='primary' >
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen