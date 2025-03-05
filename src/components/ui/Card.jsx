import React from "react";
import { Card as MUICard, CardContent as MUICardContent } from "@mui/material";

const Card = ({ children, ...props }) => {
  return <MUICard {...props}>{children}</MUICard>;
};

const CardContent = ({ children, ...props }) => {
  return <MUICardContent {...props}>{children}</MUICardContent>;
};

export { Card, CardContent };
