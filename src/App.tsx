import { useState } from "react";
import "./App.css";
import BarcodeScanner from "./components/barcodeScanner";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BarcodeScanner />
    </>
  );
}

export default App;
