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
dayjs.extend(duration);
dayjs.extend(relativeTime);

function App() {
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
  return (
    
      <Form layout="vertical" form={form} onFinish={onFinish}>
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
          </div>
        </div>
      </Form>

  );
}

export default App;
