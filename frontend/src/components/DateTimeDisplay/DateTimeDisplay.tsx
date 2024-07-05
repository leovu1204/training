import React from 'react';

interface DateTimeDisplayProps {
  timestamp: string;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ timestamp }) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return (
    <div>
      {year}-{month}-{day}
    </div>
  );
};

export default DateTimeDisplay;
