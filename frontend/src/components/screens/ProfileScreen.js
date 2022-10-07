import React, { useState, useEffect, } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { getUserDetail, UpdateUser } from '../../actions/userAction'
import { getMyOrder } from '../../actions/orderAction'
import { USER_UPDATE_RESET } from '../../constants/userConstanst'


export default function ProfileScreen() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [message, setmessage] = useState('')



    const userDetail = useSelector(state => state.userDetail)
    const { error, loading, user } = userDetail
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const myOrder = useSelector(state => state.myOrder)
    const { error: Myerror, loading: Myloading, orders } = myOrder

    const userUpdate = useSelector(state => state.userUpdate)
    const { success } = userUpdate



    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_RESET })
                dispatch(getUserDetail('profile'))
                dispatch(getMyOrder())

            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, navigate, user, dispatch, success])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== ConfirmPassword) {
            setmessage('Pasword does not match')
        } else {
            dispatch(UpdateUser({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password

            }))
        }

    }

    return (
        <Row>
            <Col md={3}>
                <h1>User Profile</h1>
                {error && <Message variant={'danger'}>{error}</Message>}
                {message && <Message variant={'danger'}>{message}</Message>}
                {loading && <Loader />}
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
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={8} className='offset-md-1'>
                <h1>Orders</h1>
                {Myloading ? (
                    <Loader />
                ) : Myerror ? (
                    <Message variant={'danger'}>{Myerror}</Message>
                ) : (
                    <Table responsive striped className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(1, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(1, 10) : <i className='fas fa-times' style={{ 'color': 'red' }}></i>}</td>
                                    <td>
                                        <LinkContainer to={`/order/${ order._id }`} >
                                            <Button className='btn-sm rounded' >Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
                }
            </Col>
        </Row>
    )
}
