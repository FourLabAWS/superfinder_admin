import * as React from "react";
import Paper from "@mui/material/Paper";
import PieChart, {
  Export as PieExport,
  Series as PieSeries,
  Label,
  Font,
  Connector,
} from "devextreme-react/pie-chart";
import { ResponsiveLine } from "@nivo/line";
import { client } from "../../routes/routes";
import { DataGrid } from "@mui/x-data-grid";

export function RegIdStats() {
  const [data, setData] = React.useState([]);
  const [uniqueDeviceCount, setUniqueDeviceCount] = React.useState(0);

  React.useEffect(() => {
    client.get("getRegId").then((response) => {
      const responseData = response.data;
      const parsedBody = JSON.parse(responseData.body);

      let totalCount = 0;

      let formattedData = Object.entries(parsedBody).map(([deviceModel, info], index) => {
        totalCount += info.unique_device_count;

        return {
          id: index,
          "Device Model": deviceModel,
          "Data Count": info.data_count,
        };
      });

      console.log(formattedData);
      setData(formattedData);
      setUniqueDeviceCount(totalCount);
    });
  }, []);

  const columns = [
    { field: "id", hide: true },
    { field: "Device Model", headerName: "휴대폰 기종", width: 300 },
    { field: "Data Count", headerName: "촬영 수", width: 200 },
  ];

  return (
    <div
      style={{ marginLeft: "32%", marginBottom: "3.5%", height: 530, width: "30.45%" }}
    >
      <h2>디바이스 총 {uniqueDeviceCount}대</h2>{" "}
      <DataGrid rows={data} columns={columns} pageSize={data.length} />
    </div>
  );
}

export function Stats() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    client.get("getstats").then((response) => {
      setData(response.data);
    });
  }, []);

  function customizeText(arg) {
    return `${arg.argumentText} (${arg.percentText})`;
  }

  return (
    <Paper elevation={0}>
      <PieChart id="pie" palette="Bright" dataSource={data}>
        <PieExport enabled={true} />
        <PieSeries argumentField="item" valueField="num">
          <Label visible={true} position="columns" customizeText={customizeText}>
            <Font size={16} />
            <Connector visible={true} width={0.5} />
          </Label>
        </PieSeries>
      </PieChart>
    </Paper>
  );
}
