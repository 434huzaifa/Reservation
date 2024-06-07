import { UseQueryResult } from "@tanstack/react-query";
import { Card, Form, FormInstance, Select, Spin } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useState } from "react";

const VehicleInformation = ({
  form,
  carListQuery,
}: {
  form: FormInstance;
  carListQuery: UseQueryResult<ResponseData>;
}) => {
  const [vehicleType, setVehicleType] = useState<string>();
  const [vehicle, setVehicle] = useState<string | null>();
  const [vehicleSelectOptions, setVehicleSelectOptions] =
    useState<DefaultOptionType[]>();
  let vehicleTypeSelectOptions: DefaultOptionType[] = [
    { value: "", label: "" },
  ];
  if (
    !carListQuery.isLoading &&
    !carListQuery.isFetching &&
    carListQuery.isSuccess
  ) {
    vehicleTypeSelectOptions = Array.from(
      new Set(carListQuery.data.data.map((car) => car.type))
    ).map((x) => ({ value: x, label: x }));
  }
  function vehicleTypeChange(v: string) {
    form.resetFields(["Vehicle"]);
    setVehicleType(v);
    const t_options: DefaultOptionType[] = [];
    carListQuery?.data?.data.forEach((x) => {
      if (x.type == v) {
        t_options.push({ value: x.id, label: `${x.make} ${x.model} ${x.year}` });
      }
    });
    if (t_options.length != 0) {
      setVehicleSelectOptions(t_options);
    } else {
      setVehicleSelectOptions([{ value: "", label: "" }]);
    }
  }
  function vehicleChange(v: string) {
    setVehicle(v);
  }
  return (
    
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
              rules={[{ required: true, message: "Please pick a Vehicle!" }]}
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
    
  );
};

export default VehicleInformation;
