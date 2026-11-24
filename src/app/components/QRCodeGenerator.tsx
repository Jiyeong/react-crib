'use client'
import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

/*
* https://velog.io/@jiwonyyy/QR%EC%BD%94%EB%93%9C-%EB%A7%8C%EB%93%A4%EA%B8%B0-qrcode.react
* https://velog.io/@bishoe01/React%EB%A1%9C-QR%EC%BD%94%EB%93%9C-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0
*
* */

export default function QRCodeGenerator() {
  const [url, setUrl] = useState('');
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  // QR 코드 다운로드 함수
  const downloadQRCode = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      // 다운로드 링크 생성
      const downloadLink = document.createElement('a');
      downloadLink.download = 'QRCode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const generateQRCode = () => {
    if (url) {
      setShowQR(true);
    }
  };


  return (
    <>
      <div className="popup"></div>
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL 또는 텍스트를 입력하세요"
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={generateQRCode}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            QR코드 생성
          </button>
        </div>

        {showQR && (
          <div className="flex flex-col items-center gap-4">
            <div ref={qrRef}>
              <QRCodeSVG
                value={url}
                size={200}
                level={'H'}
              />
            </div>
            <button
              onClick={downloadQRCode}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              QR코드 다운로드
            </button>
          </div>
        )}
      </div>
    </>
  )
}