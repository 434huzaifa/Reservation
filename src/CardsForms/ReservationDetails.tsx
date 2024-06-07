import { FormInstance } from "antd";
import { Card, Form, Input, DatePicker, InputNumber } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import humanizeDuration from "humanize-duration";
dayjs.extend(duration);
dayjs.extend(relativeTime);
const ReservationDetails = ({ form }: { form: FormInstance }) => {
  const [pickupDate, setPickupDate] = useState<Dayjs>();
  const [returnDate, setReturnDate] = useState<Dayjs | null>();
  const [returnDateStatus, setReturnDateStatus] = useState<
    "error" | "warning" | undefined
  >(undefined);
  function pickupOnChange(values: Dayjs) {
    form.resetFields(["Vehicle"]);
    setPickupDate(values);
    if (values && returnDate && values.isAfter(returnDate)) {
      setReturnDateStatus("error");
      setReturnDate(null);
    }
  }
  function returnOnChange(values: Dayjs) {
    setReturnDate(values);
    if (pickupDate && values && values.isAfter(pickupDate)) {
      setReturnDateStatus(undefined);
    }
  }
  return (

        <Card>
          <Form.Item name="ReservationID" label="Reservation ID">
            <Input />
          </Form.Item>
          <Form.Item
            name="PickupDate"
            label="Pickup Date"
            rules={[{ required: true, message: "Please pick a date!" }]}
          >
            <DatePicker
              minDate={dayjs()}
              size="large"
              value={pickupDate}
              className="w-full"
              onChange={(v) => pickupOnChange(v)}
            ></DatePicker>
          </Form.Item>
          <Form.Item
            name="ReturnDate"
            label="Return Date"
            rules={[{ required: true, message: "Please pick a date!" }]}
          >
            <DatePicker
              minDate={pickupDate?.add(1, "day")}
              value={returnDate}
              size="large"
              status={returnDateStatus}
              className="w-full"
              onChange={(v) => returnOnChange(v)}
            ></DatePicker>
            {returnDateStatus == "error" && (
              <p className="text-red-500 text-xs">
                Return date should be larger then pick up date
              </p>
            )}
          </Form.Item>
          <Form.Item layout="horizontal" label="Duration">
            <Input
              className="text-center text-base capitalize"
              value={
                pickupDate
                  ? returnDate
                    ? humanizeDuration(
                        pickupDate.diff(returnDate, "millisecond")
                      )
                    : ""
                  : ""
              }
              readOnly
            ></Input>
          </Form.Item>
          <Form.Item label="Discount" name="Discount">
            <InputNumber className="w-full"></InputNumber>
          </Form.Item>
        </Card>

  );
};

export default ReservationDetails;
