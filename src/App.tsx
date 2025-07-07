import { useEffect, useState } from "react";
import "./App.css";
import BarcodeScanner from "./components/barcodeScanner";
import "./index.css";

const App = () => {
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

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
    <div
      style={{
        minHeight: "100vh",
        padding: "3rem 2rem",
        backgroundColor: "#f0f2f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        textAlign: "center",
        color: "#222",
      }}
    >
      <img
        src="/images/twelveCelebrity.jpg"
        alt="Twelve Celebrity"
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "50%",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
          marginBottom: "1.25rem",
          transition: "transform 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />

      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          marginBottom: "0.5rem",
          color: "#2c3e50",
        }}
      >
        Twelve Celebrity
      </h2>

      <p
        style={{
          fontSize: "1rem",
          color: "#555",
          marginBottom: "0.25rem",
        }}
      >
        🗓️ {currentDate}
      </p>

      <p
        style={{
          fontSize: "1rem",
          color: "#555",
          marginBottom: "2rem",
        }}
      >
        ⏰ Heure actuelle : <strong>{currentTime}</strong>
      </p>

      <BarcodeScanner />
    </div>
  );
};

export default App;
