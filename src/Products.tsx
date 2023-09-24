import { gql, useQuery } from "@apollo/client";
import { Card, Col, Row } from "antd";
import Statistic from "antd/es/statistic/Statistic";
import React from "react";

const allProducts = gql`
  query MyQuery {
    products {
      description
      id
      name
      price
      stock
    }
  }
`;

export function Products(): JSX.Element {
  const { data: products } = useQuery(allProducts);
  // console.log("products:", products.products);

  return (
    <div>
      <Statistic
        title="Total value"
        value={products?.products
          ?.reduce((acc: any, curr: any) => acc + Number(curr?.price), 0)
          .toFixed(2)}
      />
      <Row gutter={[16, 16]}>
        {products?.products?.length &&
          products?.products?.map((item: any, index: number) => (
            <Col key={index} xs={24} sm={12} md={12} lg={8} xl={6}>
              <Card title={item.name} style={{ width: 250, height: 300 }}>
                <p>Description: {item.description}</p>
                <p>Price: {item.price}</p>
                <p>Stock: {item.stock}</p>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
}
