import { Routes, Route } from "react-router-dom";
import ScannerPage from "./components/scannerPage";
import ResultPage from "./components/resultPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ScannerPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
};

export default App;
