'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '@/app/ui/home.module.css';

export default function Example() {
  const router = useRouter()

  const moveToTictakto = () => {
    router.push('/example/tictakto')
  }
  return (
    <>
      <main className="flex min-h-screen flex-col p-6">
        <div>example - test react</div>
        <button
            onClick={moveToTictakto}
            className="btn btn-primary btn-lg"
        >
          Tictakto
        </button>
        <br/>
        <br/>
        <div className="btn btn-primary btn-lg">
          <Link href="/example/tictakto">link click</Link>
        </div>
      </main>
    </>
  )
}