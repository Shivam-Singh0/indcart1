import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import '../index.css';
import { Link } from 'react-router-dom'

function Product({ product }) {
  return (
    <Card className='my-3 rounded shadow product-card' border="light">
      <Link to={`/product/${product._id}`}>
        <Card.Img className='rounded' src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title as="div">
            {product.name}
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className='my-3'>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
          </div>
        </Card.Text>
        <Card.Text as='h3' className='text-success'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product