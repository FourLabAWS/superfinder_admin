import * as React from "react";
import Paper from "@mui/material/Paper";
import { Chart } from "devextreme-react/chart";
import { useNavigate } from "react-router-dom";

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
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export function RegIdStats({ ...props }) {
  const columns =
    props.date === "Y"
      ? [
          { field: "id", hide: true },
          { field: "fir", headerName: "날짜", width: 200 },
          { field: "sec", headerName: "촬영 수", width: 100 },
        ]
      : [
          { field: "id", hide: true },
          { field: "fir", headerName: "휴대폰 기종", width: 200 },
          { field: "sec", headerName: "촬영 수", width: 100 },
        ];

  return (
    <div
      style={{
        height: 530,
        width: "40.45%",
        margin: 50,
      }}
    >
      <h2>{props.mainTxt}</h2>
      <DataGrid rows={props.data} columns={columns} hideFooterPagination />
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

export function Graphs() {
  return (
    <React.Fragment>
      <Chart></Chart>
    </React.Fragment>
  );
}

export function BasicCard({ ...props }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ minWidth: 275, mx: 1 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="div">
          {props.mainTxt}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.subTxt}
        </Typography>
        <Typography variant="h5">{props.data.toLocaleString()}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={
            props.route.indexOf("유저")
              ? () => navigate("/analysis") //User
              : () => navigate("/User") ///analysis
          }
        >
          {props.route}
        </Button>
      </CardActions>
    </Card>
  );
}
