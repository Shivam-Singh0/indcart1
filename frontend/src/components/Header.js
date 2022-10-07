import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { logout } from '../actions/userAction'
import Message from './Message'
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')

  }
  return (

    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>

        <LinkContainer to="/">
          <Navbar.Brand className="ms-4">IndCart</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fa-solid fa-cart-shopping"></i>Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo['name']} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) :
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fa-solid fa-user"></i>Login
                </Nav.Link>
              </LinkContainer>
            }

            {userInfo && userInfo.isAdmin &&
              <NavDropdown title='Admin' id='username'>
                <LinkContainer to='/admin/users'>
                  <NavDropdown.Item>
                    Users
                  </NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/admin/productList'>
                  <NavDropdown.Item>
                    Products
                  </NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/admin/ordersList'>
                  <NavDropdown.Item>
                    Orders
                  </NavDropdown.Item>
                </LinkContainer>

              </NavDropdown>
            }


          </Nav>
        </Navbar.Collapse>

      </Navbar>
    </header>
  );
}

export default Header;
