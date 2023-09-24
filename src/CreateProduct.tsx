import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { gql, useMutation } from "@apollo/client";

type Props = {};

const CreateProduct = (props: Props) => {
  const create = gql`
    mutation MyMutation($product: products_insert_input!) {
      insert_products_one(object: $product) {
        description
        id
        name
        price
        stock
      }
    }
  `;

  // const [formData, setFormData] = useState({
  //   name: "",
  //   price: 0,
  //   stock: 0,
  //   desciption: "",
  // });

  const [insert_products_one, { data, loading, error }] = useMutation(create);

  const handleForm = (values: Object) => {
    console.log(insert_products_one, data, loading, error);
    insert_products_one({ variables: { product: values } })
      .then((res) => {
        alert(
          "Successfully added product. Please refresh to see all the products"
        );
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Form
        name="nest-messages"
        style={{ maxWidth: 600 }}
        onFinish={handleForm}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ type: "number", min: 0, required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="stock"
          label="Stock"
          rules={[{ type: "number", min: 0, required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
