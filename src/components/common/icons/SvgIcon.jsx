import React from "react";
import MuiSvgIcon from "@mui/material/SvgIcon";

export default function SvgIcon({ color, fontSize, children }) {
  const isMuiFontSize =
    fontSize === "small" ||
    fontSize === "medium" ||
    fontSize === "large" ||
    fontSize === "inherit";
  return (
    <MuiSvgIcon
      color={color}
      fontSize={isMuiFontSize ? fontSize : undefined}
      sx={isMuiFontSize ? undefined : { fontSize }}
    >
      {children}
    </MuiSvgIcon>
  );
}
