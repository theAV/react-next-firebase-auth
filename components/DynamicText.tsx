import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Heading } from "@chakra-ui/react";
const DynamicText = forwardRef((props, ref) => {
  const [value, setValue] = useState("Home");

  const changeValue = (newValue: string) => {
    setValue(newValue);
  };

  useImperativeHandle(ref, () => ({
    changeValue: changeValue,
    value: value
  }));



  return <Heading sx={{wordBreak:'break-all'}}>{value}</Heading>;
});

export default DynamicText;
