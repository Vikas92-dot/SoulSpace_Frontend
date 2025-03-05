import React from "react";
import { Button as MUIButton } from "@mui/material";

const Button = ({ variant = "contained", color = "primary", children, ...props }) => {
  return (
    <MUIButton variant={variant} color={color} {...props}>
      {children}
    </MUIButton>
  );
};

export { Button };
