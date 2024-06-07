import { Card, Form, Checkbox } from "antd";

const AdditionalCharges = () => {
  return (
    <Card>
      <Form.Item name="AdditionalCharges">
        <Checkbox.Group className="w-full">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <Checkbox className="mb-3" value={1}>Collision Damage Waiver</Checkbox>
              <Checkbox className="mb-3" value={2}>Liability Insurance</Checkbox>
              <Checkbox value={3}>Rental Tax</Checkbox>
            </div>
            <div className="flex flex-col">
              <p className="mb-3">$9.00</p>
              <p className="mb-3">$15.00</p>
              <p>11.5%</p>
            </div>
          </div>
        </Checkbox.Group>
      </Form.Item>
    </Card>
  );
};

export default AdditionalCharges;
