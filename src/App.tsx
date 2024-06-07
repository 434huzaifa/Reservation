/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form} from "antd";
import MainForms from "./CardsForms/MainForms"

function App() {
  const [form]=Form.useForm()

  return (
    <div className="py-10 px-14">
      <div className="flex justify-between">
        <p className="font-bold text-2xl">Reservation</p>
        <Button type="primary" size="large" onClick={()=>form.submit()}> 
          Print / Download
        </Button>
      </div>
      <MainForms form={form}></MainForms>
    </div>
  );
}

export default App;
