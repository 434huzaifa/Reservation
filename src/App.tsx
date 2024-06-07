/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, InputNumber, Select, Spin } from "antd";
import CateTitle from "./CateTitle";
import { Card, Form, Input, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import humanizeDuration from "humanize-duration";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DefaultOptionType } from "antd/es/select";
dayjs.extend(duration);
dayjs.extend(relativeTime);

function App() {
  const [vehicleType, setVehicleType] = useState<string>();
  const [vehicle, setVehicle] = useState<string|null>();
  const [returnDate, setReturnDate] = useState<Dayjs | null>();
  const [vehicleSelectOptions,setVehicleSelectOptions]=useState<DefaultOptionType[]>()
  const [returnDateStatus, setReturnDateStatus] = useState<
    "error" | "warning" | undefined
  >(undefined);
  const [pickupDate, setPickupDate] = useState<Dayjs>();
  let vehicleTypeSelectOptions: DefaultOptionType[] = [
    { value: "", label: "" },
  ];
  const carListQuery = useQuery({
    queryKey: ["carlist"],
    queryFn: async () => {
      const res = await axios.get(
        "https://exam-server-7c41747804bf.herokuapp.com/carsList"
      );
      return res.data as ResponseData;
    },
    staleTime: Infinity,
  });

  if (
    !carListQuery.isLoading &&
    !carListQuery.isFetching &&
    carListQuery.isSuccess
  ) {
    vehicleTypeSelectOptions = Array.from(
      new Set(carListQuery.data.data.map((car) => car.type))
    ).map((x) => ({ value: x, label: x }));
  }
  async function vehicleTypeChange(v: string) {
    setVehicleType(v);
    const t_options: DefaultOptionType[] = [];
    carListQuery?.data?.data.forEach((x) => {
      if (x.type == v) {
        t_options.push({ value: x.id, label: x.model });
      }
    });
    if (t_options.length!=0) {
      setVehicleSelectOptions(t_options)
    }else{
      setVehicleSelectOptions([{value:'',label:''}])
    }
    await setVehicle(null)
  }
  function vehicleChange(v: string) {
    setVehicle(v);
  }
  function pickupOnChange(values: Dayjs) {
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
  function onFinish(values: any) {
    console.log(values);
  }
  return (
    <div className="py-10 px-20">
      <div className="flex justify-between">
        <p className="font-bold text-2xl">Reservation</p>
        <Button type="primary" size="large">
          Print / Download
        </Button>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <div className="grid grid-cols-3 mt-10 gap-8">
          <div className="flex flex-col">
            <CateTitle title="Reservation Details"></CateTitle>
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
            <CateTitle title="Vehicle Information"></CateTitle>
            <Card>
              {carListQuery.isLoading || carListQuery.isFetching ? (
                <Spin></Spin>
              ) : carListQuery.isSuccess ? (
                <>
                  <Form.Item
                    label="Vehicle Type"
                    name="VehicleType"
                    rules={[
                      {
                        required: true,
                        message: "Please pick a Vehicle Type!",
                      },
                    ]}
                  >
                    <Select
                    allowClear
                      options={vehicleTypeSelectOptions}
                      value={vehicleType}
                      onChange={(v) => vehicleTypeChange(v)}
                    ></Select>
                  </Form.Item>
                  <Form.Item
                    label="Vehicle "
                    name="Vehicle"
                    rules={[
                      { required: true, message: "Please pick a Vehicle!" },
                    ]}
                  >
                    <Select
                    allowClear
                      options={vehicleSelectOptions}
                      value={vehicle}
                      onChange={(v) => vehicleChange(v)}
                    ></Select>
                  </Form.Item>
                </>
              ) : (
                <p className="text-xs text-red-500">
                  Something went south with carList API
                </p>
              )}
            </Card>
          </div>
          <div className="flex flex-col">
            <CateTitle title="Customer Information"></CateTitle>
            <CateTitle title="Additional Charges"></CateTitle>
          </div>
          <div>
            <CateTitle title="Charges Summary"></CateTitle>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default App;
