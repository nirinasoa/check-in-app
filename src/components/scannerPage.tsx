import { useEffect, useState } from "react";
import BarcodeScanner from "./barcodeScanner";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
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
    axios.get('https://kviwvjyteyxzyuzcttxa.supabase.co/rest/v1/student?id_number=eq.12321535245', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2aXd2anl0ZXl4enl1emN0dHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDk5MDMsImV4cCI6MjA2NzQ4NTkwM30.VTNduqNeKdj0F42TQHGANoq1bhdoVjM_hGSnWOEPcwU' // par exemple pour Supabase
      }
    })
      .then((response : any) => {
        console.log(response)
        navigate("/result", { state: { result : response.data[0].firstname } });
      })
      .catch(error => {
        console.error(error);
      })
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
