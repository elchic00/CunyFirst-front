import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

export const Instructors = () => {
  return (
    <Typography
      sx={{ /*textDecoration: "underline",*/ mb: 5 }}
      fontFamily={"Oxygen"}
      gutterBottom
      component="div"
      variant="h2"
    >
      Instructors
    </Typography>
  );
};
