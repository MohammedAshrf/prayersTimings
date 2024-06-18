import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function TimeInTimeZone({ timeZone }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options = {
        timeZone: timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options); // Specify 'en-US' locale
      setTime(formatter.format(date));
    };

    updateTime(); // Initial call to set time immediately
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timeZone]);

  return (
    <div>
      <p>
        Current time in {timeZone}: {time}
      </p>
    </div>
  );
}
