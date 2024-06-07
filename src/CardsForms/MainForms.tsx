/* eslint-disable @typescript-eslint/no-explicit-any */
import CateTitle from "../CateTitle";
import { Form } from "antd";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReservationDetails from "./ReservationDetails";
import VehicleInformation from "./VehicleInformation";
import CustomerInformation from "./CustomerInformation";
import AdditionalCharges from "./AdditionalCharges";
import ChargesSummary from "./ChargesSummary";
import { Summary, ResponseData, FormData, Rates } from "../Types";
import { useState } from "react";
dayjs.extend(duration);
dayjs.extend(relativeTime);

function App() {
  const [dataSource, setDataSource] = useState<Summary[]>();
  const [form] = Form.useForm();
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

  function onFinish(values: any) {
    console.log(values);
  }
  function onValuesChange(
    changedValues: Partial<Record<string, any>>,
    values: FormData
  ) {
    if (
      Object.keys(changedValues).some((x) =>
        [
          "PickupDate",
          "ReturnDate",
          "Discount",
          "AdditionalCharges",
          "Vehicle",
        ].includes(x)
      )
    ) {
      const t_dataSource: Summary[] = [];
      const t_percentage: Summary[] = [];
      if (values.PickupDate && values.ReturnDate && values.Vehicle) {
        let rate: Rates | undefined;
        carListQuery?.data?.data.forEach((x) => {
          if (x.id == values.Vehicle) {
            rate = x.rates;
          }
        });
        const weeks = values.ReturnDate.diff(values.PickupDate, "w");
        values.ReturnDate = values.ReturnDate.subtract(7 * weeks, "d");
        const days = values.ReturnDate.diff(values.PickupDate, "d");
        values.ReturnDate = values.ReturnDate.subtract(24 * days, "h");
        const hours = values.ReturnDate.diff(values.PickupDate, "h");
        if (days && rate) {
          t_dataSource.push({
            Charge: "Daily",
            Rate: rate.daily,
            Unit: days,
            Total: days * rate.daily,
          });
        }
        if (weeks && rate) {
          t_dataSource.push({
            Charge: "Weekly",
            Rate: rate.weekly,
            Unit: weeks,
            Total: weeks * rate.weekly,
          });
        }
        if (hours && rate) {
          t_dataSource.push({
            Charge: "Hourly",
            Rate: rate.hourly,
            Unit: hours,
            Total: hours * rate.hourly,
          });
        }
      }
      if (values.Discount) {
        t_percentage.push({ Charge: "Discount", Rate: values.Discount });
      }
      if (values.AdditionalCharges && values.AdditionalCharges.length != 0) {
        if (values.AdditionalCharges.includes(1)) {
          t_dataSource.push({ Charge: "Collision Damage Waiver", Total: 9 });
        }
        if (values.AdditionalCharges.includes(2)) {
          t_dataSource.push({ Charge: "Liability Insurance", Total: 15 });
        }
        if (values.AdditionalCharges.includes(3)) {
          t_percentage.push({ Charge: "Rental Tax", Rate: 11.5 });
        }
      }
      
      let total = 0;
      let Tax = 0;
      let Discount = 0;
      t_dataSource?.forEach((x) => {
        if (x.Total) {
          total = total + x.Total;
        }
      });
      t_percentage?.forEach((x) => {
        if (x.Charge == "Discount" && x.Rate) {
          Discount = (total * x.Rate) / 100;
          t_dataSource?.push({ Charge: x.Charge, Rate: x.Rate, Total: Discount });
        } else if (x.Charge == "Rental Tax" && x.Rate) {
          Tax = (total * x.Rate) / 100;
          t_dataSource?.push({ Charge: x.Charge, Rate: x.Rate, Total: Tax });
        }
      });
      t_dataSource.push({ Charge: "Total", Total: total+Tax-Discount });
      setDataSource(t_dataSource);
    }
  }
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    >
      <div className="grid grid-cols-3 mt-10 gap-8">
        <div className="flex flex-col">
          <CateTitle title="Reservation Details"></CateTitle>
          <ReservationDetails form={form}></ReservationDetails>
          <CateTitle title="Vehicle Information"></CateTitle>
          <VehicleInformation
            form={form}
            carListQuery={carListQuery}
          ></VehicleInformation>
        </div>
        <div className="flex flex-col">
          <CateTitle title="Customer Information"></CateTitle>
          <CustomerInformation></CustomerInformation>
          <CateTitle title="Additional Charges"></CateTitle>
          <AdditionalCharges></AdditionalCharges>
        </div>
        <div>
          <CateTitle title="Charges Summary"></CateTitle>
          <ChargesSummary
            dataSource={dataSource}
          ></ChargesSummary>
        </div>
      </div>
    </Form>
  );
}

export default App;
