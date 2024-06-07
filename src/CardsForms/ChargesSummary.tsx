import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Summary } from "../Types";

const ChargesSummary = ({dataSource}:{dataSource:Summary[]|undefined}) => {
    console.log(dataSource);
    const columns:ColumnsType=[
        {
            title:"Charge",
            key:"Charge",
        },
        {
            title:"Unit",
            key:"Unit",
        },
        {
            title:"Rate",
            key:"Rate"
        },
        {
            title:"Total",
            key:"Total"
        }
    ]
  return (
      <Table bordered size="small" columns={columns}></Table>
  );
};

export default ChargesSummary;
