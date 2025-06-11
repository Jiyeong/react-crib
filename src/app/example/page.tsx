'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
// import ExLayout from "@/app/example/layout";

export default function Example() {
  const router = useRouter()

  const moveToTictakto = () => {
    router.push('/example/tictactoe')
  }
  return (
    <>
      {/*
        폴더 내부에 layout.tsx 에 레이아웃 적용하면 하위 페이지들은 별도로 감싸지 않아도 자동으로 적용된다.
        따라서 아래처럼 레이아웃을 import, 태그 작성 할 필요가 없다.
      */}
      {/*<ExLayout></ExLayout>*/}
      <main className="flex min-h-screen flex-col p-6">
        <div>
          <h3>example - test react</h3>
          <Image alt="testimage" src="/images/test1.JPG" width="200" height="200" />
        </div>
        {/*
        <button
          onClick={moveToTictakto}
          className="btn btn-primary btn-lg"
        >
          Tictakto
        </button>
        <div className="btn btn-primary btn-lg">
          <Link href="/example/tictactoe">link click</Link>
        </div>
        */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href={'/example/list'}
            rel="noopener noreferrer"
          >
            list click
          </a>
          <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
              href={'/example/tictactoe'}
              rel="noopener noreferrer"
          >
            tictactoe click
          </a>
        </div>
      </main>
    </>
  )
}