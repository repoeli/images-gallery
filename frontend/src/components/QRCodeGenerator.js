import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = ({ url, size = 128 }) => {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const generateQR = async () => {
      if (!url) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        await QRCode.toCanvas(canvasRef.current, url, {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff'
          },
          errorCorrectionLevel: 'H' // Highest error correction level
        });
      } catch (err) {
        setError('Failed to generate QR code');
        console.error('QR Code generation error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    generateQR();
  }, [url, size]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary link element
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="qr-code-container text-center">
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <canvas ref={canvasRef} className="mb-3" />
          <div className="mt-3">
            <button 
              className="btn btn-primary btn-sm"
              onClick={handleDownload}
            >
              Download QR Code
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QRCodeGenerator;