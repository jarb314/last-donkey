import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "./button.component";

export default function BasicTextFields({
  setPassword,
  setEmail,
  handleAction
}) {
  return (
    <Box
      className="form-container"
      component="form"
      sx={{
        "& > :not(style)": { m: 1 }
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="email"
        label="Enter the Email"
        fullWidth
        required
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        fullWidth
        required
        label="Enter the Password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button handleAction={handleAction} text="Inicia Sesión" />
    </Box>
  );
}
