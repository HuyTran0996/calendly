import React from "react";

const TimeSelect = ({
  step = 30,
  value,
  onChange,
}: {
  step: 30 | 60;
  value: string;
  onChange: (v: string) => void;
}) => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    times.push((i < 10 ? "0" + i : i) + ":00");
    if (step === 30) {
      times.push((i < 10 ? "0" + i : i) + ":30");
    }
  }

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {times.map((time, index) => (
        <option key={index} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};

export default TimeSelect;
