import { Card, Form, Checkbox } from "antd";

const AdditionalCharges = () => {
  return (
    <Card>
      <Form.Item name="AdditionalCharges">
        <Checkbox.Group>
          <div className="grid  grid-cols-5 gap-y-4">
            <div className="col-span-4">
              <Checkbox value={1}>Collision Damage Waiver</Checkbox>
              <Checkbox value={2}>Liability Insurance</Checkbox>
              <Checkbox value={3}>Rental Tax</Checkbox>
            </div>
            <div>
              <p>$9.00</p>
              <p>$15.00</p>
              <p>11.5%</p>
            </div>
          </div>
        </Checkbox.Group>
      </Form.Item>
    </Card>
  );
};

export default AdditionalCharges;
