/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button} from "antd";
import MainForms from "./CardsForms/MainForms"

function App() {



  return (
    <div className="py-10 px-20">
      <div className="flex justify-between">
        <p className="font-bold text-2xl">Reservation</p>
        <Button type="primary" size="large">
          Print / Download
        </Button>
      </div>
      <MainForms></MainForms>
    </div>
  );
}

export default App;
