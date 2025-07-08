// components/barcodeScanner.tsx
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";

interface Props {
  onScan: (result: string) => void;
}

const BarcodeScanner = ({ onScan }: Props) => {
  const [result, setResult] = useState<any>(null);
  console.log(result);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");

    Html5Qrcode.getCameras().then((devices) => {
    onScan("test")

      if (devices && devices.length) {
        let cameraId = devices[0].id;

        if (devices.length >= 1) cameraId = devices[1]?.id;

        html5QrCode
          .start(
            cameraId,
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText: string) => {
              setResult(decodedText);
              onScan(decodedText); // ⬅️ call parent handler
              html5QrCode.stop(); // stop scanning
            },
            () => {}
          )
          .catch((err) => {
            console.error("Erreur scanner", err);
          });
      }
    });

    return () => {
      // Optional cleanup
    };
  }, []);

  return (
    <>
      <div id="reader" style={{ width: "300px" }}></div>
    </>
  );
};

export default BarcodeScanner;
