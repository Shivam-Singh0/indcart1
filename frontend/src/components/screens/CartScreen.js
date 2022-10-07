import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../Message'
import { addToCart, removeFromCart } from '../../actions/cartAction'


function CartScreen() {
    const { id } = useParams();
    const navigate = useNavigate()
    const productId = id
    console.log(productId)


    const location = useLocation();
    const qty = Number(location.search.split('=')[1])
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart


    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/shipping')
    }

    return (
        <Row className='my-4'>
            <Col md={8}>
                <h1 className='mb-4'>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant={'info'}>Your Cart is Empty <Link to='/'>Go Back</Link> </Message>
                ) : (

                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />

                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${ item.product }`} style={{ textDecoration: 'none' }}>{item.name}</Link>
                                    </Col>
                                    <Col md={2} className="text-success my-auto">
                                        ${item.price}
                                    </Col>
                                    <Col md={3} className="my-auto">
                                        <Form.Select
                                            value={item.qty}

                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            size="sm"
                                        >
                                            {[...Array(item.CountInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col md={1} className="my-auto">
                                        <Button variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash text-danger'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                )
                }
            </Col>
            <Col md={4}>
                <ListGroup >
                    <ListGroup.Item>
                        <h1>Subtotal  ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items</h1>
                        $({cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)})
                    </ListGroup.Item>
                    <ListGroup.Item className="d-grid">
                        <Button disabled={cartItems.length === 0} onClick={checkoutHandler}>
                            Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    )
}

export default CartScreen
