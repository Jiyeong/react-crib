// https://www.npmjs.com/package/qrcode.react
import {QRCodeSVG} from 'qrcode.react';
import {useEffect, useState } from "react";

export default function QRCode() {
  const [qrValue, setQrValue] = useState('')
  setQrValue('https://dybwindow.com/')

  return (
    <>
      <div className="qrBox">
        <QRCodeSVG value={qrValue}/>
      </div>
    </>
  )
}