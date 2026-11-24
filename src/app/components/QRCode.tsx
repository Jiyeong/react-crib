// https://www.npmjs.com/package/qrcode.react
import {QRCodeSVG} from 'qrcode.react';
import { useState } from "react";

export default function QRCode() {
  // 렌더링 중 setState를 호출하면 무한 렌더링이 발생하므로 초기값으로 지정
  const [qrValue] = useState('https://dybwindow.com/')

  return (
    <>
      <div className="qrBox">
        <QRCodeSVG value={qrValue}/>
      </div>
    </>
  )
}