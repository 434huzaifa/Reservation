import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Summary } from "../Types";

const ChargesSummary = ({
  dataSource,
}: {
  dataSource: Summary[] | undefined;
}) => {
  console.log(dataSource);
//   let total = 0;
//   let Tax = 0;
//   let Discount = 0;
//   dataSource?.forEach((x) => {
//     if (x.Total) {
//       total = total + x.Total;
//     }
//   });

//   percentage?.forEach((x) => {
//     if (x.Charge == "Discount" && x.Rate) {
//       Discount = (total * x.Rate) / 100;
//       dataSource?.push({ Charge: x.Charge, Rate: x.Rate, Total: Discount });
//     } else if (x.Charge == "Rental Tax" && x.Rate) {
//       Tax = (total * x.Rate) / 100;
//       dataSource?.push({ Charge: x.Charge, Rate: x.Rate, Total: Tax });
//     }
//   });
//   dataSource?.push({ Charge: "Total", Total: total + Tax - Discount });
  const columns: ColumnsType = [
    {
      title: "Charge",
      key: "Charge",
      dataIndex: "Charge",
      render: (value, record, index) => {
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
      //   onCell: (record: Summary, index) => {
      //     if ((dataSource && index == dataSource?.length - 1) || !record.Unit) {
      //       return { colSpan: 3 };
      //     } else {
      //       return { colSpan: 1 };
      //     }
      //   },
    },
    {
      title: "Unit",
      key: "Unit",
      dataIndex: "Unit",
      //   onCell: (record: Summary, index) => {
      //     if (!record.Unit || (dataSource && index == dataSource?.length - 1)) {
      //       return { colSpan: 0 };
      //     } else {
      //       return { colSpan: 1 };
      //     }
      //   },
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
      //   onCell: (record, index) => {
      //     if (!record.Rate || (dataSource && index == dataSource?.length - 1)) {
      //       return { colSpan: 0 };
      //     } else {
      //       return { colSpan: 1 };
      //     }
      //   },
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
