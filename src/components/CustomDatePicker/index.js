import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const CustomDatePicker = ({ label, value, handleChange }) => {
  return (
    <div>
      <p>{label}</p>
      <DatePicker onChange={(date) => handleChange(date)} value={value} />
    </div>
  );
};

export default CustomDatePicker;
