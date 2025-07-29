import { Routes, Route } from "react-router-dom";
import ScannerPage from "./components/scannerPage";
import ResultPage from "./components/resultPage";
import HistoryPage from "./components/historyPage";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ScannerPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  );
};

export default App;
