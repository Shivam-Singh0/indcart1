import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import Loader from "../Loader";
import Message from "../Message";

function HomeScreen() {
  const [msg, setmsg] = useState("")
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const userLogin = useSelector((state) => state.userLogin)
  const { error, loading, products } = productList;
  const { loggedout } = userLogin

  useEffect(() => {
    dispatch(listProducts());
    if (loggedout) {
      setmsg('logged out')
    }
  }, [dispatch, loggedout]);

  return (
    <div>
      <h1>Latest Products</h1>
      {msg && <Message variant={'info'}>{msg}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
