import { useState } from "react";

interface DatePickerProps {
  onChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setSelectedDate(e.target.value);
    onChange(date);
  };

  return (
    <input
      type="date"
      value={selectedDate}
      onChange={handleChange}
      style={{ padding: "10px", fontSize: "16px" }}
    />
  );
};

export { DatePicker };
