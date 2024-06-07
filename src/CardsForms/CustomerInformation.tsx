import { Card, Form, Input, InputNumber } from "antd";

const CustomerInformation = () => {
  return (
    <Card>
      <Form.Item
        name="FirstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: "Please enter your first name!",
          },
        ]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
      name="LastName"
      label="Last Name"
      rules={[
        {
          required: true,
          message: "Please enter your last name!",
        },
      ]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
      name="Email"
      label="Email"
      rules={[
        {
          required: true,
          message: "Please enter your email!",
        },
      ]}
      >
        <Input type="email"></Input>
      </Form.Item>
      <Form.Item
      name="Phone"
      label="Phone"
      rules={[
        {
          required: true,
          message: "Please enter your email!",
        },
      ]}
      >
        <InputNumber className="w-full"></InputNumber>
      </Form.Item>

    </Card>
  );
};

export default CustomerInformation;
