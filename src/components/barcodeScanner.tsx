import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";

const BarcodeScanner = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");

    Html5Qrcode.getCameras().then((devices) => {
      if (devices && devices.length) {
        let cameraId = devices[0]?.id;

        if (devices.length >= 1) cameraId = devices[1]?.id;

        html5QrCode
          .start(
            cameraId,
            {
              fps: 10, // fréquence de scan
              qrbox: { width: 250, height: 250 },
            },
            (decodedText: any) => {
              console.log("ok ok");
              setResult(decodedText); // affichage du résultat
              html5QrCode.stop(); // arrêt du scanner après un scan
            },
            () => {
              // erreurs silencieuses pendant le scan
            }
          )
          .catch((err) => {
            console.error("Erreur lors du démarrage du scanner", err);
          });
      }
    });

    // Nettoyage à la sortie du composant
    return () => {
      //html5QrCode.stop().catch(() => {});
    };
  }, []);

  return (
    <div>
      <h2 style={{ color: "gray", fontSize: "16px" }}>Scanner un code-barres</h2>
      <div id="reader" style={{ width: "300px" }}></div>
      {result && (
        <div>
          <h3>Résultat :</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
