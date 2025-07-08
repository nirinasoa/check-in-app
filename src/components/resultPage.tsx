// pages/ResultPage.tsx
import { Button } from "@mui/joy";
import { useLocation, useNavigate } from "react-router-dom";
import Banner from "./banner";

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return (
      <div>
        <p>Aucun résultat trouvé. Veuillez scanner de nouveau.</p>
        <button onClick={() => navigate("/")}>Scanner</button>
      </div>
    );
  }

  return (
    <div className=" result-container">
      <Banner />

      <h2 className="result-title">Résultat du scan</h2>

      <p className="result-code">
        <strong>{result.id_number}</strong>
      </p>

      <img src={result.picture} alt="Scanned Person" className="profile-image" />

      <p className="info-text">
        <strong>Nom:</strong> {result.name}
      </p>
      <p className="info-text">
        <strong>Prénom:</strong> {result.firstname}
      </p>

      <div className="button-group">
        <Button onClick={() => navigate("/")}>Scanner de nouveau</Button>
        <Button color="danger" onClick={() => navigate("/")}>
          Annuler
        </Button>
      </div>
    </div>
  );
};

export default ResultPage;
