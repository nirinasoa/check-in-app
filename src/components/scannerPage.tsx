import { useEffect, useState } from "react";
import BarcodeScanner from "./barcodeScanner";
import { useNavigate } from "react-router-dom";
import "../App.css";

import "../index.css";
import Banner from "./banner";

const ScannerPage = () => {
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const navigate = useNavigate();

  const handleScanResult = (result: string) => {
    // Navigate to result page with result as state
    navigate("/result", { state: { result } });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(
        now.toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" result-container">
      <Banner />
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #eee", // very light gray
          margin: "1rem 0",
        }}
      />
      <p className="date-text">🗓️ {currentDate}</p>
      <p className="time-text">
        ⏰ Heure actuelle : <strong>{currentTime}</strong>
      </p>

      <BarcodeScanner onScan={handleScanResult} />
    </div>
  );
};

export default ScannerPage;
