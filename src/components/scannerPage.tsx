import { useEffect, useState } from "react";
import Input from '@mui/joy/Input';
import BarcodeScanner from "./barcodeScanner";
import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../App.css";

import "../index.css";
import Banner from "./banner";

const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2aXd2anl0ZXl4enl1emN0dHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDk5MDMsImV4cCI6MjA2NzQ4NTkwM30.VTNduqNeKdj0F42TQHGANoq1bhdoVjM_hGSnWOEPcwU';

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
  const [manualInputCode, setManualInputCode] = useState<string>();

  const handleScanResult = (result: string) => {
    // Navigate to result page with result as state
    axios.get('https://kviwvjyteyxzyuzcttxa.supabase.co/rest/v1/student?id_number=eq.' + result, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'apikey': apikey
      }
    })
      .then((response: any) => {
        if (response.data.length > 0) {
          const student = response.data[0];
          // Check if exist 
          const today = new Date();
          const yyyy = today.getFullYear();
          const mm = String(today.getMonth() + 1).padStart(2, '0');
          const dd = String(today.getDate()).padStart(2, '0');

          const start = `${yyyy}-${mm}-${dd}T00:00:00`;
          const end = `${yyyy}-${mm}-${dd}T23:59:59`;
          axios.get(`https://kviwvjyteyxzyuzcttxa.supabase.co/rest/v1/checkin?created_at=gte.${start}&created_at=lte.${end}&id_student=eq.${student.id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'apikey': apikey
            }
          }).then((responseCheck : any) => {
            if (responseCheck.data.length > 0) {
              alert("L'édudiant est déjà checké !")
            } else {
              // Post CHECKIN
              axios.post('https://kviwvjyteyxzyuzcttxa.supabase.co/rest/v1/checkin',
                {
                  'id_student': student.id
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'apikey': apikey
                  }
                }).then((response1: any) => {
                  console.log(response1)
                  navigate("/result", { state: { result: response.data[0] } });
                })
            }
          })
          

        } else {
          navigate("/result", { state: { result: null } });

        }
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
      {/* <div style={{width : '250px', height: '250px', backgroundColor: '#000000'}}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, ratione sit facilis, voluptas ad corporis magnam facere rem molestias nemo eius nobis! Blanditiis ab, in at fugiat hic reprehenderit nulla!
      </div> */}

      <div style={{marginTop : '.6rem'}}>
        <Input type="number" onChange={(val) => {setManualInputCode(val.target.value)}} style={{marginBottom : '.6rem'}} placeholder="Code..." />
        <Button onClick={() => {if (manualInputCode) handleScanResult(manualInputCode)}}>Valider</Button>
      </div>
    </div>
  );
};

export default ScannerPage;
