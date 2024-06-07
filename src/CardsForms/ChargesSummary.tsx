import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Summary } from "../Types";

const ChargesSummary = ({
  dataSource,
}: {
  dataSource: Summary[] | undefined;
}) => {
  const columns: ColumnsType = [
    {
      title: "Charge",
      key: "Charge",
      dataIndex: "Charge",
      render: (value, _, index) => {
        if (dataSource && dataSource?.length - 1 == index) {
          return <p className="font-bold">Total</p>;
        } else if (value == "Discount") {
          return "Discount(%)";
        } else if (value == "Rental Tax") {
          return "Rental Tax(%)";
        } else {
          return value;
        }
      },
        onCell: (record: Summary) => {
          if (record.Charge=="Total") {
            return { colSpan: 3 };
          } else {
            return { colSpan: 1 };
          }
        },
    },
    {
      title: "Unit",
      key: "Unit",
      dataIndex: "Unit",
        onCell: (record: Summary) => {
          if (record.Charge=="Total") {
            return { colSpan: 0 };
          } else {
            return { colSpan: 1 };
          }
        },
    },
    {
      title: "Rate",
      key: "Rate",
      dataIndex: "Rate",
      render: (value, record, index) => {
        if (!record.Rate || (dataSource && dataSource?.length - 1 == index)) {
          return "";
        } else {
          return value;
        }
      },
        onCell: (record) => {
            if (record.Charge=="Total") {
                return { colSpan: 0 };
              } else {
                return { colSpan: 1 };
              }
        },
    },
    {
      title: "Total",
      key: "Total",
      dataIndex: "Total",
      render: (value, record, index) => {
        if (dataSource) {
          if (dataSource && dataSource?.length - 1 == index) {
            return <p className="font-bold">{record.Total.toFixed(2)}</p>;
          } else if (record.Charge == "Discount") {
            return `-${record.Total.toFixed(2)}`;
          } else if (record.Charge == "Rental Tax") {
            return `+${record.Total.toFixed(2)}`;
          } else {
            return value;
          }
        }
      },
    },
  ];
  return (
    <Table
      pagination={false}
      dataSource={dataSource && dataSource?.length > 1 ? dataSource : undefined}
      bordered
      size="small"
      columns={columns}
    ></Table>
  );
};

export default ChargesSummary;
