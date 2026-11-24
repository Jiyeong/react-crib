'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
// import ExLayout from "@/app/example/layout";
import QRCode from "@/app/components/QRCode"
import QRCodeGenerator from "@/app/components/QRCodeGenerator";

import { ANIMAL_OPTIONS, type AnimalType } from '@/constants/options'


export default function Example() {
  const router = useRouter()
  const [image, setImage] = useState<{ id: string; url: string; width: number; height: number }[]>([])
  const [option, setOption] = useState('cat')

  const getRandomImage = async () => {
    const res = await fetch(`https://api.the${option}api.com/v1/images/search?limit=1`)
    setImage(await res.json())
  }

  const moveToTictakto = () => {
    router.push('/example/tictactoe')
  }

  useEffect(() => {
    getRandomImage()

  }, [option])

/*  useEffect( () => {
    (async () => {
    })()
  }, [])*/
  return (
    <>
      {/*
        폴더 내부에 layout.tsx 에 레이아웃 적용하면 하위 페이지들은 별도로 감싸지 않아도 자동으로 적용된다.
        따라서 아래처럼 레이아웃을 import, 태그 작성 할 필요가 없다.
      */}
      {/*<ExLayout></ExLayout>*/}
      <main className="flex min-h-screen flex-col p-6">
        
        {/* 랜덤 이미지 표시 영역 */}
        <div className="" style={{ border: '1px solid gray', width: '100%'}}>
          <div className="flex gap-4 w-full max-w-sm">
          {ANIMAL_OPTIONS.map((item) => (
            <label
              key={item.value}
              className={`
                flex flex-row items-center px-3 py-2 rounded-lg cursor-pointer
                border-2 transition-all duration-200 gap-2
                flex-1 justify-center
                ${option === item.value
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'}
              `}
            >
              <span className="text-2xl">{item.icon}</span>
              <input
                type="radio"
                name="option"
                value={item.value}
                checked={option === item.value}
                onChange={(e) => setOption(e.target.value as AnimalType)}
                className="sr-only"
              />
              <span className="font-medium">{item.label}</span>
            </label>
          ))}
          </div>

          <div className="flex gap-4" style={{border: '1px solid gray', width: '100%'}}>
            <div className="w-[300px] h-[300px] relative">
              {image.map((item, index) => <Image alt="test" src={item.url} width={item.width} height={item.height} key={item.id} />)}
            </div>
          </div>
        </div>
        {/*<QRCodeGenerator />*/}


        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href={'/example/list'}
            rel="noopener noreferrer"
          >
            list
          </a>
          <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
              href={'/example/tictactoe'}
              rel="noopener noreferrer"
          >
            Tictakto
          </a>
        </div>
      </main>
    </>
  )
}