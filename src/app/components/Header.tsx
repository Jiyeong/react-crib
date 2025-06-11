'use client'
import {useEffect, useState } from "react";

export default function Header() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
  })
  return (
      <>
        <header id="header" className="mainHeader">
          <div className="headerWrap">
            <div className="left">
              LEFT
              <button onClick={() => moveToBack()}>🔙</button>
              {/*<img src="/images.png" alt="logo" />*/}
            </div>
            <div className="center">
              🕔{time}
            </div>
            <div className="right">
              RIGHT
            </div>
          </div>
        </header>
      {/*
       <header id="header" className="mainHeader">
        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex-1 text-left">left</div>
          <div className="flex-1 text-center">🕔 {time}</div>
          <div className="flex-1 text-right">right</div>
        </div>
      </header>
       */}
      </>
  )
}
const moveToBack = () => {
  window.history.back()
}