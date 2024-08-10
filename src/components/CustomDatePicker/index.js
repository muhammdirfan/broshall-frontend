// import React, { useState } from "react";
// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const DatePicker = () => {
//   const [selectedDate, setSelectedDate] = useState(null);

//   return (
//     <div className="mt-4 flex flex-col items-center">
//       <ReactDatePicker
//         selected={selectedDate}
//         onChange={(date) => setSelectedDate(date)}
//         className="rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         dateFormat="MMMM d, yyyy"
//         placeholderText="Select a date"
//       />
//     </div>
//   );
// };

// export default DatePicker;

import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const CustomDatePicker = () => {
  const [value, onChange] = useState(new Date());
  return <DatePicker onChange={onChange} value={value} />;
};

export default CustomDatePicker;
