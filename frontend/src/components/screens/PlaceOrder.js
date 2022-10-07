import React, { useState, useEffect, } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { Card, ListGroup, Button, Row, Col, Image } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import CheckSteps from '../CheckSteps'
import { createOrder } from '../../actions/orderAction'
import { ORDER_CREATE_RESET } from '../../constants/orderConstants'


function PlaceOrder() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const cart = useSelector(state => state.cart)
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    cart.shippingPrice = Number(cart.itemsPrice > 100 ? 0 : 10)
    cart.taxPrice = (0.18) * cart.itemsPrice
    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice)
    const { shipping_add } = cart


    if (!cart.paymentMethod) {
        navigate('/payment ')
    }


    useEffect(() => {
        if (success) {
            navigate(`/order/${ order._id }`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, navigate, dispatch])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shipping_add: cart.shipping_add,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))

    }
    return (
        <div>
            <CheckSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                Shipping: {' '}
                                {shipping_add.add},{shipping_add.city},
                                {shipping_add.postal}

                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                Method: {' '}
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <h2>Order Item</h2>
                        <ListGroup variant='flush'>
                            {cart.cartItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col className='my-auto'>
                                            <Link to={`/product/${ item.product }`} style={{ textDecoration: 'none' }}>{item.name}</Link>
                                        </Col>
                                        <Col className='my-auto'>
                                            {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )

                            )}
                        </ListGroup>
                        <ListGroup.Item>

                        </ListGroup.Item>
                    </ListGroup>

                </Col>
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item><h2>Order Summery</h2></ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Item:</Col>
                                <Col className='text-secondary'>$ {cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col className='text-secondary'>$ {cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col className='text-secondary'>$ {cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col className='text-secondary'>$ {cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger' >{error}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item className='d-grid'>
                            <Button type='submit' onClick={placeOrder}>
                                Place Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrder