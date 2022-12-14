import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { getUserList, delUser } from '../../actions/userAction'
import Loader from '../Loader'
import Message from '../Message'

function UserList() {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userDel = useSelector(state => state.userDel)
    const { success } = userDel

    useEffect(() => {
        dispatch(getUserList())
    }, [dispatch, success])

    const deleteHandler = (id) => {
        dispatch(delUser(id))
    }

    return (
        <div>
            <h1>Users</h1>
            {loading ?
                (<Loader />) :
                error ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (<i className="fa-sharp fa-solid fa-check" style={{ 'color': 'green' }}></i>) :
                                            (<i className='fas fa-times' style={{ 'color': 'red' }}></i>)
                                        }</td>
                                        <td>
                                            <LinkContainer to={`/admin/user/${ user._id }`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='light' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                                <i className='fas fa-trash' style={{ 'color': 'red' }}></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
            }
        </div>
    )
}

export default UserList