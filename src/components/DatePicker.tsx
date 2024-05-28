import classNames from "classnames";
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
      className={classNames(
        "block rounded-md border-0 py-1.5 px-3",
        "text-gray-900",
        "shadow-sm ring-1 ring-inset ring-gray-300",
        "placeholder:text-gray-400",
        "focus:ring-2 focus:ring-inset focus:ring-indigo-600",
        "sm:text-sm sm:leading-6"
      )}
    />
  );
};

export { DatePicker };
