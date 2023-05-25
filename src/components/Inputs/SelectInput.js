import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./styles.css";

export default function SelectField(props) {
  const keywords = ["디바이스ID", "파일명", "골프장", "오류 상태"];
  const [value, setValue] = React.useState(keywords[0]);

  function handleChange(e) {
    setValue(e.target.value);
    props.setVal(e.target.value);
  }
  return (
    <Select
      sx={{ width: "100%" }}
      size="small"
      labelId="demo-select-small"
      id="demo-select-small"
      value={value}
      onChange={handleChange}
    >
      {keywords.map((key) => (
        <MenuItem value={key} key={key}>
          {key}
        </MenuItem>
      ))}
    </Select>
  );
}
