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

export function RegIdStats() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    client.get("getRegId").then((response) => {
      const responseData = response.data;
      //console.log(responseData);
      const parsedBody = JSON.parse(responseData.body);
      let formattedData = Object.entries(parsedBody).map(([date, count]) => ({
        x: date,
        y: count,
      }));

      // Sort the data array by date
      formattedData.sort((a, b) => new Date(a.x) - new Date(b.x));

      setData([{ id: "device_count", data: formattedData }]);
    });
  }, []);

  return (
    <div style={{ height: "500px" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{
          type: "time",
          format: "%Y-%m",
          precision: "month",
        }}
        xFormat="time:%Y-%m"
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: "%Y-%m",
          tickValues: "every 1 month",
          legend: "Time",
          legendOffset: -12,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Device Count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        tooltip={({ point }) => {
          return (
            <div
              style={{ background: "white", padding: "10px", border: "1px solid #ccc" }}
            >
              <strong>일자:</strong> {point.data.xFormatted}
              <br />
              <strong>사용자:</strong> {point.data.yFormatted}
            </div>
          );
        }}
      />
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
